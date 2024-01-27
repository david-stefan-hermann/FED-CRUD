import { Request, Response } from "express"
import { db } from "../db.ts"
import { ObjectId } from "mongodb"
import jwt from 'jsonwebtoken'

const collectionName = "users"


// Export a function named getLikes that handles HTTP requests to get likes for a specific post
export const getLikes = async (req: Request, res: Response) => {
    console.log("likes: getLikes called")

    try {
        const collection = db.collection(collectionName)
        const query = {}

        const result = collection.find(query).project({likes: 1, _id: 0}).sort({likes: 1})
        const resultArray = await result.toArray()
        const likes = resultArray.map(item => item.likes)
        
        // Count the number of likes
        const likeCount = likes.filter(item => item.includes(req.params.id)).length
        
        let likedByUser = false
        if (req.body.userID) {
            const currentUser = await collection.findOne({_id: new ObjectId(req.body.userID)})
            currentUser?.likes.includes(req.params.id) ? likedByUser = true : likedByUser = false
        }

        // console.log("liked", likedByUser)

        // Return the query results as a JSON response with status 200
        res.status(200).json({likes: likeCount, liked: likedByUser})
    } catch (err) {
        // Log any errors to the console
        res.status(500).json("Verbindungsfehler zur Datenbank.")
    }
}

// Export a function named addLike to handle HTTP PUT requests for updating an likes
export const addLike = async (req: Request, res: Response) => {
    console.log("likes: addLike called")

    if (!req.body.userID) {
        // console.log("Error: newPost object not found in request body")
        res.status(400).send("Error: newPost object not found in request body")
        return
    }
    
    try {
        const collection = db.collection(collectionName)
        const currentUser = await collection.findOne({_id: new ObjectId(req.body.userID)})
        
        if (!currentUser) {
            // console.log("Error: user not found")
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
        res.status(500).json("Verbindungsfehler zur Datenbank.")
    }
}
