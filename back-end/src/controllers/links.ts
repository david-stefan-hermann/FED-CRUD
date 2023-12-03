import { Request, Response } from 'express'
import { db } from "../db.ts"


export const getLinks = (req: Request, res: Response) => {
    const q = {
        text: "SELECT id, title FROM fed_schema.essi ORDER BY title ASC"
    }

    db.query(q)
    .then(result => {
        return res.status(200).json(result.rows)
    })
    .catch(err => {
        return console.log(err)
    })
}
