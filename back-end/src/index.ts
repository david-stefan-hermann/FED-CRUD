// Importing necessary modules from external packages
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

// Importing route handlers from the local file system
import postRoutes from "./routes/posts.ts"
import linkRoutes from "./routes/links.ts"
import catsRoutes from "./routes/cats.ts"

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

// Starting the Express server on port 8800
app.listen(8800, () => {
    console.log("Running on port 8800")
})
