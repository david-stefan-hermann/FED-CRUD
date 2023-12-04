// Import Request and Response types from the express module
import { Request, Response } from "express"
// Import the database instance from the local db module
import { db } from "../db.ts"

// Export a function named getPosts to handle HTTP GET requests for retrieving posts
export const getPosts = (req: Request, res: Response) => {
    // Define a query to select all columns from the "essi" table in "fed_schema", ordered by "title"
    const q = {
        text: "SELECT * FROM fed_schema.essi ORDER BY title ASC"
    }

    // Execute the query against the database
    db.query(q)
    .then(result => {
        // Return the query results as a JSON response with status 200
        return res.status(200).json(result.rows)
    })
    .catch(err => {
        // Log any errors to the console
        return console.log(err)
    })
}

// Export a function named getPost to handle HTTP GET requests for a specific post by id
export const getPost = (req: Request, res: Response) => {
    // Define a query to select a post by id
    const q = {
        text: "SELECT * FROM fed_schema.essi WHERE id = $1",
        values: [req.params.id]
    }

    // Execute the query against the database
    db.query(q)
    .then(result => {
        // Return the first row of the query results as a JSON response with status 200
        return res.status(200).json(result.rows[0])
    })
    .catch(err => {
        // Log any errors to the console
        return console.log(err)
    })
}

// Export a function named addPost to handle HTTP POST requests for adding a new post
export const addPost = (req: Request, res: Response) => {
    // Extract the new post data from the request body
    const { newPost } = req.body
    console.log("posts add updated: " + newPost.updated)
    // Define a query to insert a new post into the database
    const q = {
        text: "INSERT INTO fed_schema.essi (title, author, updated, rating, category, image, recipe, short) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        values: [newPost.title, newPost.author, newPost.updated, newPost.rating, newPost.category, newPost.image, newPost.recipe, newPost.short]
    }

    // Execute the query against the database
    db.query(q)
    .then(result => {
        // Return a success message as a JSON response with status 200
        return res.status(200).json("Post added successfully.")
    })
    .catch(err => {
        // Log any errors to the console
        return console.log(err)
    })
}

// Export a function named deletePost to handle HTTP DELETE requests for deleting a post by id
export const deletePost = (req: Request, res: Response) => {
    // Define a query to delete a post by id
    const q = {
        text: "DELETE FROM fed_schema.essi WHERE fed_schema.essi.id = $1",
        values: [req.params.id]
    }

    // Execute the query against the database
    db.query(q)
    .then(result => {
        // Return a success message as a JSON response with status 200
        return res.status(200).json("Post deleted successfully.")
    })
    .catch(err => {
        // Log any errors to the console
        return console.log(err)
    })
}

// Export a function named updatePost to handle HTTP PUT requests for updating an existing post
export const updatePost = (req: Request, res: Response) => {
    // Extract the updated post data from the request body
    const { newPost } = req.body

    // Define a query to update an existing post in the database
    const q = {
        text: "UPDATE fed_schema.essi SET title = $1, author = $2, updated = $3, rating = $4, category = $5, image = $6, recipe = $7, short = $8 WHERE id = $9",
        values: [newPost.title, newPost.author, newPost.updated, newPost.rating, newPost.category, newPost.image, newPost.recipe, newPost.short, newPost.id]
    }

    // Execute the query against the database
    db.query(q)
    .then(result => {
        // Return a success message as a JSON response with status 200
        return res.status(200).json("Post updated successfully.")
    })
    .catch(err => {
        // Log any errors to the console
        return console.log(err)
    })
}
