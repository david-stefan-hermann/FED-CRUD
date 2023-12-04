// Import Request and Response types from the express module
import { Request, Response } from "express"
// Import the database instance from the local db module
import { db } from "../db.ts"

// Export a function named getCats that handles HTTP requests for cat categories
export const getCats = (req: Request, res: Response): void => {
    // Define a query object to select the "category" column from the "essi" table in "fed_schema"
    const q = {
        text: "SELECT category FROM fed_schema.essi"
    }

    // Execute the query against the database
    db.query(q)
    .then((result: { rows: { category: string }[] } ) => {
        // On successful query execution, process the result and return a JSON response with status 200
        return res.status(200).json(csvArrayToUniqueValues(result.rows))
    })
    .catch((err: Error) => {
        // On error, log the error and send a 500 Internal Server Error response
        console.error(err)
        res.status(500).send("An error occurred while fetching categories")
    })
}

// Define a helper function to convert an array of CSV strings to an array of unique values
const csvArrayToUniqueValues = (csvArray: { category: string }[]): string[] => {    
    // Split each CSV string into individual values, flatten them into a single array, and filter out duplicates
    const allValues = csvArray
        .flatMap(obj => obj.category.split(","))
        .filter((value, index, self) => self.indexOf(value) === index)

    // Return the array of unique values
    return allValues
}

