import { db } from "../db.js"


export const getLinks = (req, res) => {
    console.log("getPosts - api")
    const q = {
        text: "SELECT id, title FROM fed_schema.essi"
    }

    db.query(q)
    .then(result => {
        return res.status(200).json(result.rows)
    })
    .catch(err => {
        return console.log(err)
    })
}
