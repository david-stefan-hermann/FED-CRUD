import { Request, Response } from 'express'
import { db } from '../db.ts' // Ensure the import path is correct and TypeScript compatible
import { QueryError } from 'mysql2'

export const getCats = (req: Request, res: Response): void => {
    const q = {
        text: "SELECT category FROM fed_schema.essi"
    }

    db.query(q)
    .then((result: { rows: { category: string }[] } ) => {
        return res.status(200).json(csvArrayToUniqueValues(result.rows))
    })
    .catch((err: Error) => {
        console.error(err)
        res.status(500).send('An error occurred')
    })
}

const csvArrayToUniqueValues = (csvArray: { category: string }[]): string[] => {    
    const allValues = csvArray
        .flatMap(obj => obj.category.split(','))
        .filter((value, index, self) => self.indexOf(value) === index)

    return allValues
}
