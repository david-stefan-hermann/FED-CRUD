import { db } from "../db.js"


export const getPosts = (req, res) => {
    const q = {
        text: "SELECT * FROM fed_schema.essi ORDER BY title ASC"
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
        text: "SELECT * FROM fed_schema.essi WHERE id = $1",
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

export const addPost = (req, res) => {
    const { newPost } = req.body

    const q = {
        text: "INSERT INTO fed_schema.essi (title, author, updated, rating, category, image, recipe, short) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        values: [newPost.title, newPost.author, newPost.updated, newPost.rating, newPost.category, newPost.image, newPost.recipe, newPost.short]
    }

    db.query(q)
    .then(result => {
        return res.status(200).json("Post added successfully.")
    })
    .catch(err => {
        return console.log(err)
    })
}

export const deletePost = (req, res) => {
    const q = {
        text: "DELETE FROM fed_schema.essi WHERE fed_schema.essi.id = $1",
        values: [req.params.id]
    }
    db.query(q)
    .then(result => {
        return res.status(200).json("Post deleted successfully.")
    })
    .catch(err => {
        return console.log(err)
    })
}

export const updatePost = (req, res) => {
    const { newPost } = req.body

    const q = {
        text: "UPDATE fed_schema.essi SET title = $1, author = $2, updated = $3, rating = $4, category = $5, image = $6, recipe = $7, short = $8 WHERE id = $9",
        values: [newPost.title, newPost.author, newPost.updated, newPost.rating, newPost.category, newPost.image, newPost.recipe, newPost.short, newPost.id]
    }

    db.query(q)
    .then(result => {
        return res.status(200).json("Post updated successfully.")
    })
    .catch(err => {
        return console.log(err)
    })
}
