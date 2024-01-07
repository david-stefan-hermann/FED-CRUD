import { Request, Response } from "express"
import { connectDB, closeDB } from "../db.ts"

const collectionName = "recipes"


// Export a function named getCats that handles HTTP requests for cat categories
export const getCats = async (req: Request, res: Response): Promise<void> => {
    console.log("GET /cats")

    try {
        const database = await connectDB()
        const collection = database.collection(collectionName)
        const query = {}

        const result = await collection.find(query).sort({category: 1}).toArray()
        // Log the query results to the console
        console.log(result)
        // Return the query results as a JSON response with status 200
        res.status(200).json(csvArrayToUniqueValues(result.map(obj => ({category: obj.category}))))
    } catch (err) {
        // Log any errors to the console
        console.log(err)
    } finally {
        // Close the database connection
        await closeDB()
    }
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

