import { Request, Response } from "express"
import { db } from "../db.ts"
import bcrypt from "bcryptjs"

const collectionName = "users"

export const login = async (req: Request, res: Response) => {
    console.log("login: called")

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
        if (user === null) return res.status(404).json("Falscher Benutzername oder Passwort.")

        // Check Password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) return res.status(400).json("Falscher Benutzername oder Passwort.")

    } catch(err) {
        console.log(err)
    }

}

export const logout = async (req: Request, res: Response) => {
    console.log("logout: called")
}

export const register = async (req: Request, res: Response) => {
    console.log("register: called")

    // check if empty
    if (req.body.username === "" || req.body.password === "") {
        return res.status(422).json("Benutzername oder Passwort fehlt.")
    }

    // check if username too short
    if (req.body.username.length < 4) {
        return res.status(422).json("Benutzername zu kurz, mindestens 4 Stellen")
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
            password: hash
        })
        res.status(200).json("Benutzer erfolgreich erstellt.")
    } catch(err) {
        res.status(500).json("Verbindungsfehler zur Datenbank.")
    }
}