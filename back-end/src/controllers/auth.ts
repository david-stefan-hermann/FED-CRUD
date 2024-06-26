import { Request, Response } from "express"
import { db } from "../db.ts"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

const collectionName = "users"

export const login = async (req: Request, res: Response) => {
    console.log("auth: login called")

    // check empty
    if (req.body.username == "" || req.body.password == "") {
        return res.status(422).json("Empty username or password")
    }

    // check for existing user
    try {
        const collection = db.collection(collectionName)
        const query = { username: req.body.username }

        const user = await collection.findOne(query)

        // terminate if user not found, same error message to prevent username guessing
        if (user === null) return res.status(401).json("Falscher Benutzername oder Passwort.")

        // Check Password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) return res.status(401).json("Falscher Benutzername oder Passwort.")

        // set cookie and local storage
        const token = jwt.sign({ id: user._id }, "jwtkey")
    
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({
                id: user._id,
                username: user.username,
                likes: user.likes
            })
    } catch(err) {
        return res.status(500).json("Verbindungsfehler zur Datenbank.")
    }
}

export const logout = async (req: Request, res: Response) => {
    console.log("auth: logout called")

    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("logged out")
}

export const register = async (req: Request, res: Response) => {
    console.log("auth: register called")

    // check if empty
    if (req.body.username === "" || req.body.password === "") {
        return res.status(422).json("Benutzername oder Passwort fehlt.")
    }

    // check if username too short
    if (req.body.username.length < 4) {
        return res.status(422).json("Benutzername zu kurz, mindestens 4 Stellen")
    }

    // check if username contains special characters
    if (req.body.username.match(/[^a-zA-Z0-9]/)) {
        return res.status(422).json("Benutzername darf nur Buchstaben und Zahlen enthalten.")
    }

    // check if password too short
    if (req.body.password.length < 8) {
        return res.status(422).json("Passwort zu kurz, mindestens 8 Stellen.")
    }

    // check if username too long
    if (req.body.username.length > 30) {
        return res.status(422).json("Benutzername zu kurz, maximal 30 Stellen")
    }

    // check if password too long
    if (req.body.password.length > 100) {
        return res.status(422).json("Passwort zu kurz, maximal 100 Stellen.")
    }

    // check if user exists
    const collection = db.collection(collectionName)
    const query = { username: req.body.username }

    // get users with the same username
    let existingUsers: any[]
    try {
        existingUsers = await collection.find(query).toArray()
    } catch (err) {
        return res.status(500).json("Verbindungsfehler zur Datenbank.")
    }

    // if there are users with the same username, return error
    if (existingUsers && existingUsers.length > 0) {
        return res.status(409).json("Benutzername ist bereits vergeben.")
    }

    // Hash the password with bcryptjs
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    // Create the user
    try {
        await collection.insertOne({
            username: req.body.username,
            password: hash,
            likes: []
        })
        res.status(200).json("Benutzer erfolgreich erstellt.")
    } catch(err) {
        res.status(500).json("Verbindungsfehler zur Datenbank.")
    }
}