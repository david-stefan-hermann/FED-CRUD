// Import Express module for routing
import express from "express"

// Import the getLinks controller function
import { getLikes, addLike } from "../controllers/likes.ts"

// Create a new Express router
const router = express.Router()

// Define POST routes for auth methods
router.get("/", getLikes)
router.put("/", addLike)

// Export the configured router
export default router
