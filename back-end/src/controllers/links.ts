// Import Request and Response types from the express module
import { Request, Response } from "express"
// Import the database instance from the local db module
import { db } from "../db.ts"

// Export a function named getLinks that handles HTTP requests
export const getLinks = (req: Request, res: Response) => {
    // Define a query object to select the "id" and "title" columns from the "essi" table in "fed_schema"
    // and order the results by "title" in ascending order
    const q = {
        text: "SELECT id, title FROM fed_schema.essi ORDER BY title ASC"
    }

    // Execute the query against the database
    db.query(q)
    .then(result => {
        // On successful query execution, return the result rows as a JSON response with status 200
        return res.status(200).json(result.rows)
    })
    .catch(err => {
        // On error, log the error to the console
        return console.log(err)
    })
}
