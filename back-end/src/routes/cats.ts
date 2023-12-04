// Import Express module for routing
import express from "express"

// Import the getCats controller function
import { getCats } from "../controllers/cats.ts"

// Create a new Express router
const router = express.Router()

// Define GET route for "/" and assign getCats as the handler
router.get("/", getCats)

// Export the configured router
export default router
