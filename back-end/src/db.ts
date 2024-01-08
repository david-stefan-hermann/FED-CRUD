// Import MongoClient from the mongodb package
import { Db, MongoClient } from "mongodb"

// Define the URI for the MongoDB instance
const uri = "mongodb://localhost:27017"

let client: MongoClient
export let db: Db

// This function is used to connect to the MongoDB database
export async function connectDB() {
    try {
        // Attempt to establish a connection to the MongoDB instance
        client = new MongoClient(uri)
        await client.connect()
        db = client.db("fed")

        // Return the database instance for further operations
        // return db
    } catch (error) {
        // If there's an error during the connection, log it and re-throw
        console.error("Error connecting to database: ", error)
        throw error
    }
}

// This function is used to close the connection to the MongoDB database
export async function closeDB() {
    try {
        // Attempt to close the connection to the MongoDB instance
        await client.close()
    } catch (error) {
        // If there's an error during the disconnection, log it and re-throw
        console.error("Error closing database connection: ", error)
        throw error
    }
}