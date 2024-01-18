import { Request, Response } from "express"
import { db } from "../db.ts"
import bcrypt from "bcryptjs"

const collectionName = "users"

export const login = async (req: Request, res: Response) => {
    console.log("login: called")
}

export const logout = async (req: Request, res: Response) => {
    console.log("logout: called")
}

export const register = async (req: Request, res: Response) => {
    console.log("register: called")

    // check if empty
    if (req.body.username === "" || req.body.password === "") {
        return res.status(422).json("Benutzername oder Passwort fehlt.");
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