import { Request, Response } from "express"
import { db } from "../db.ts"
import { ObjectId } from "mongodb"

const collectionName = "users"


// Export a function named getCats that handles HTTP requests for cat categories
export const getLikes = async (req: Request, res: Response) => {
    console.log("GET likes")

    try {
        const collection = db.collection(collectionName)
        const query = {}

        const result = collection.find(query).project({likes: 1, _id: 0}).sort({likes: 1})
        const result_array = await result.toArray()
        const likes = result_array.map(item => item.likes)
        
        // Convert the array of CSV strings to an array of values
        const likesAsArray = csvArrayToValues(likes)

        // Count the number of likes
        const likeCount = likesAsArray.filter(item => item === req.body.id).length
        
        // Return the query results as a JSON response with status 200
        res.status(200).json(likeCount)
    } catch (err) {
        // Log any errors to the console
        console.log(err)
    }
}

// Define a helper function to convert an array of CSV strings to an array of unique values
const csvArrayToValues = (csvArray: string[]): string[] => {    
    // Filter out null values, split each CSV string into individual values, 
    // flatten them into a single array, and filter out duplicates
    const allValues = csvArray
        .filter(csv => csv !== null)
        .flatMap(csv => csv.split(","))
        .map(value => value.toLocaleLowerCase())

    // Return the array of unique values
    return allValues
}

// Define a helper function to convert an array of CSV strings to an array of unique values
const csvArrayToUniqueValues = (csvArray: string[]): number => {    
    // Filter out null values, split each CSV string into individual values, 
    // flatten them into a single array, and filter out duplicates
    const allValues = csvArray
        .filter(csv => csv !== null)
        .flatMap(csv => csv.split(","))
        .map(value => value.toLocaleLowerCase())
        .filter((value, index, self) => self.indexOf(value) === index)

    // Return the array of unique values
    return allValues.length
}


// Export a function named addLike to handle HTTP PUT requests for updating an likes
export const addLike = async (req: Request, res: Response) => {
    console.log("updatePost: called")

    if (!req.body._id) {
        console.log("Error: newPost object not found in request body")
        res.status(400).send("Error: newPost object not found in request body")
        return
    }
    
    try {
        const collection = db.collection(collectionName)
        
        const filter = {_id: new ObjectId(req.params.id)}

        const newPost = req.body.newPost
        
        const update = {
            $set: {
                likes: ""
            }
        }

        await collection.updateOne(filter, update)

        res.status(201).json(req.body.id)
    } catch (err) {
        console.log(err)
    }
}
