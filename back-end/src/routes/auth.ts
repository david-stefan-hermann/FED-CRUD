// Import Express module for routing
import express from "express"

// Import the getCats controller function
import { login, logout, register } from "../controllers/auth.ts"

// Create a new Express router
const router = express.Router()

// Define POST routes for auth methods
router.post("/login/", login)
router.post("/logout/", logout)
router.post("/register/", register)

// Export the configured router
export default router
