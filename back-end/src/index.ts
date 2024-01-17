// Importing necessary modules from external packages
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

// Importing route handlers from the local file system
import postRoutes from "./routes/posts.ts"
import linkRoutes from "./routes/links.ts"
import catsRoutes from "./routes/cats.ts"
import authRoutes from "./routes/auth.ts"

import { connectDB, closeDB } from "./db.ts"

// Creating an instance of an Express application
const app = express()

// Middleware to parse JSON payloads in requests with a maximum size of 100MB
app.use(bodyParser.json({ limit: "100mb" }))

// Middleware to parse URL-encoded payloads with a maximum size of 100MB
// "extended: true" allows for rich objects and arrays to be encoded
app.use(bodyParser.urlencoded({ 
    limit: "100mb", 
    extended: true 
}))

// Enabling CORS (Cross-Origin Resource Sharing) for all routes
app.use(cors())

// Middleware to parse incoming requests with JSON payloads
app.use(express.json())

// Mounting route handlers for different paths
app.use("/api/essi", postRoutes)  // Routes for handling post-related operations
app.use("/api/links", linkRoutes) // Routes for handling link-related operations
app.use("/api/cats", catsRoutes)  // Routes for handling cat-related operations
app.use("/api/auth", authRoutes)  // Routes for handling auth-related operations"


connectDB().then(() => {
    // Starting the Express server on port 8800
    app.listen(8800, () => {
        console.log("Running on port 8800")
    })
}).catch(err => {
    // If there's an error during the connection, log it and re-throw
    console.error("Error connecting to database: ", err)
    process.exit(1)
})
