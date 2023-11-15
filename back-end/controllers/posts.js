import { db } from "../db.js"


export const getPosts = (req, res) => {
    console.log("getPosts - api")
    const q = {
        text: "SELECT * FROM fed_schema.essi"
    }

    db.query(q)
    .then(result => {
        return res.status(200).json(result.rows)
    })
    .catch(err => {
        return console.log(err)
    })
}

export const getPost = (req, res) => {
    const q = {
        text: "SELECT * FROM fed_schema.essi WHERE title = ($1)",
        values: [req.params.id]
    }

    db.query(q)
    .then(result => {
        return res.status(200).json(result.rows[0])
    })
    .catch(err => {
        return console.log(err)
    })
}
/*
export const addPost = (req, res) => {
    res.json("posts - from controller")
}

export const deletePost = (req, res) => {
    res.json("posts - from controller")
}

export const updatePost = (req, res) => {
    res.json("posts - from controller")
}
*/