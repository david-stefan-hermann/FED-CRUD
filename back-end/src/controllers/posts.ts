import { Request, Response } from "express"
import { connectDB, closeDB } from "../db.ts"
import { ObjectId } from "mongodb"

const collectionName = "recipes"

// Export a function named getPosts to handle HTTP GET requests for retrieving posts
export const getPosts = async (req: Request, res: Response) => {
    console.log("getPosts: called")

    try {
        const database = await connectDB()
        const collection = database.collection(collectionName)
        const query = {}

        const result = await collection.find(query).sort({title: 1}).toArray()
        // Log the query results to the console
        console.log(result)
        // Return the query results as a JSON response with status 200
        res.status(200).json(result)
    } catch (err) {
        // Log any errors to the console
        console.log(err)
    } finally {
        // Close the database connection
        await closeDB()
    }
}

// Export a function named getPost to handle HTTP GET requests for a specific post by id
export const getPost = async (req: Request, res: Response) => {
    console.log("getPost: called")

    try {
        const database = await connectDB()
        const collection = database.collection(collectionName)
        const query = {_id: new ObjectId(req.params.id)}

        const result = await collection.findOne(query)

        console.log(result)
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
    } finally {
        await closeDB()
    }
}

// Export a function named addPost to handle HTTP POST requests for adding a new post
export const addPost = async (req: Request, res: Response) => {
    console.log("addPost: called")

    try {
        const database = await connectDB()
        const collection = database.collection(collectionName)
        
        const post = {
            title: req.body.title,
            author: req.body.author,
            updated: req.body.updated,
            rating: req.body.rating,
            category: req.body.category,
            image: req.body.image,
            recipe: req.body.recipe,
            short: req.body.short
        }

        const result = await collection.insertOne(post)
        const id = result.insertedId

        res.location(`/locations/${id}`)
        res.status(201).json(id)
    } catch (err) {
        console.log(err)
    } finally {
        await closeDB()
    }
}

// Export a function named deletePost to handle HTTP DELETE requests for deleting a post by id
export const deletePost = async (req: Request, res: Response) => {
    console.log("deletePost: called")

    try {
        const database = await connectDB()
        const collection = database.collection(collectionName)

        const query = {_id: new ObjectId(req.params.id)}

        await collection.deleteOne(query)
        res.status(204).end()
    } catch (err) {
        console.log(err)
    } finally {
        await closeDB()
    }
}

// Export a function named updatePost to handle HTTP PUT requests for updating an existing post
export const updatePost = async (req: Request, res: Response) => {
    console.log("updatePost: called")

    try {
        const database = await connectDB()
        const collection = database.collection(collectionName)
        
        const filter = {_id: new ObjectId(req.params.id)}

        const update = {
            $set: {
                title: req.body.title,
                author: req.body.author,
                updated: req.body.updated,
                rating: req.body.rating,
                category: req.body.category,
                image: req.body.image,
                recipe: req.body.recipe,
                short: req.body.short
            }
        }

        await collection.updateOne(filter, update)
        res.status(204).end()
    } catch (err) {
        console.log(err)
    } finally {
        await closeDB()
    }
}
