import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import postRoutes from "./routes/posts.js"
import linkRoutes from "./routes/links.js"
import catsRoutes from "./routes/cats.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/essi", postRoutes)
app.use("/api/links", linkRoutes)
app.use("/api/cats", catsRoutes)

app.listen(8800, () => {
    console.log('Running on p 8800')
})

