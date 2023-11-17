import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

import postRoutes from "./routes/posts.js"
import linkRoutes from "./routes/links.js"
import catsRoutes from "./routes/cats.js"

const app = express()

// For JSON payloads
app.use(bodyParser.json({ limit: '100mb' }));

// For URL-encoded payloads
app.use(bodyParser.urlencoded({ 
    limit: '100mb', 
    extended: true 
}));

app.use(cors())
app.use(express.json())

app.use("/api/essi", postRoutes)
app.use("/api/links", linkRoutes)
app.use("/api/cats", catsRoutes)

app.listen(8800, () => {
    console.log('Running on p 8800')
})

