import { Request, Response } from "express"
import { db } from "../db.ts"
import { ObjectId } from "mongodb"

const collectionName = "users"

export const login = async (req: Request, res: Response) => {
    console.log("login: called")
}

export const logout = async (req: Request, res: Response) => {
    console.log("logout: called")
}

export const register = async (req: Request, res: Response) => {
    console.log("register: called")
}