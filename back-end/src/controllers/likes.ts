import { Request, Response } from "express"
import { db } from "../db.ts"
import { ObjectId } from "mongodb"

const collectionName = "users"


// Export a function named getLikes that handles HTTP requests to get likes for a specific post
export const getLikes = async (req: Request, res: Response) => {
    console.log("GET likes")

    try {
        const collection = db.collection(collectionName)
        const query = {}

        const result = collection.find(query).project({likes: 1, _id: 0}).sort({likes: 1})
        const resultArray = await result.toArray()
        const likes = resultArray.map(item => item.likes)
        
        // Count the number of likes
        const likeCount = likes.filter(item => item === req.params.id)
        
        // console.log("get likes: " + likesAsArray + " - " + req.params.id)

        // Return the query results as a JSON response with status 200
        res.status(200).json(likeCount.length)
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
    console.log("addLike: called")

    if (!req.body.userID) {
        console.log("Error: newPost object not found in request body")
        res.status(400).send("Error: newPost object not found in request body")
        return
    }
    
    try {
        const collection = db.collection(collectionName)
        const currentUser = await collection.findOne({_id: new ObjectId(req.body.userID)})
        
        if (!currentUser) {
            console.log("Error: user not found")
            res.status(400).send("Error: user not found")
            return
        }
        
        const currentUserLikesArray = currentUser.likes
        
        if (currentUserLikesArray.includes(req.params.id)) {
            // Get the index of the post ID in the user's likes
            const index = currentUserLikesArray.indexOf(req.params.id)
            // Remove the post ID from the user's likes
            currentUserLikesArray.splice(index, 1)
        } else {
            // Add the post ID to the user's likes
            currentUserLikesArray.push(req.params.id)
        }

        const update = {
            $set: {
                likes: currentUserLikesArray
            }
        }
        
        const filter = {_id: new ObjectId(req.body.userID)}
        await collection.updateOne(filter, update)

        res.status(201).json("Updted likes")
    } catch (err) {
        console.log(err)
    }
}
