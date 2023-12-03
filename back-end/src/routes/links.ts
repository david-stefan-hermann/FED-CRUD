import express from "express"
import { getLinks } from "../controllers/links.ts"

const router = express.Router()

router.get("/", getLinks)

export default router