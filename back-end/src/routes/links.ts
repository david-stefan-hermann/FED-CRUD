// Import Express module for routing
import express from "express";

// Import getLinks function from links controller
import { getLinks } from "../controllers/links.ts";

// Create a new router instance
const router = express.Router();

// Define a GET route on "/" path, handled by getLinks
router.get("/", getLinks);

// Export the router for use elsewhere in the app
export default router;
