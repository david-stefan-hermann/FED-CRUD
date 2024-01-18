import { Request, Response } from "express"
import { db } from "../db.ts"
import { ObjectId } from "mongodb"
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

    const collection = db.collection(collectionName)

    // Hash the password with bcryptjs
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)

    // Create the user
    try {
        await collection.insertOne({
            username: req.body.username,
            password: hash
        })
        console.log("register: user created successfully")
        res.status(200).json("User has been created.")
    } catch(err) {
        console.error("register: error during user creation:", err)
        res.status(500).json("Server error while creating the user.")
    }
}