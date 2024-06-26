import { Request, Response } from "express"
import { db } from "../db.ts"

const collectionName = "recipes"

// Export a function named getLinks that handles HTTP requests
export const getLinks = async (req: Request, res: Response) => {
    try {
        const collection = db.collection(collectionName)
        const query = {}

        const result = await collection.find(query).sort({title: 1}).project({id: 1, title: 1}).toArray()
        
        // Log the query results to the console
        // console.log(result)

        // Return the query results as a JSON response with status 200
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json("Verbindungsfehler zur Datenbank.")
    }
}
