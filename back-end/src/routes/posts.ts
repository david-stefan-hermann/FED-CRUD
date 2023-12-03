// Import Express module for routing
import express from "express";

// Import various controller functions for post operations
import { getPost, getPosts, addPost, deletePost, updatePost } from "../controllers/posts.ts";

// Create a new router instance from express
const router = express.Router();

// Set up route handlers for various HTTP methods and paths
router.get("/", getPosts);         // GET request to fetch all posts
router.get("/:id", getPost);       // GET request to fetch a single post by ID
router.post("/", addPost);         // POST request to add a new post
router.delete("/:id", deletePost); // DELETE request to delete a post by ID
router.put("/:id", updatePost);    // PUT request to update a post by ID

// Export the router for use in the main application
export default router;
