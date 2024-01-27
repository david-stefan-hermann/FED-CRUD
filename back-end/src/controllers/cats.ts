import { Request, Response } from "express"
import { db } from "../db.ts"

const collectionName = "recipes"


// Export a function named getCats that handles HTTP requests for cat categories
export const getCats = async (req: Request, res: Response) => {
    console.log("GET /cats")

    try {
        const collection = db.collection(collectionName)
        const query = {}

        const result = collection.find(query).project({category: 1, _id: 0}).sort({category: 1})
        const result_array = await result.toArray()

        // make one array of all categories
        const all_categories = result_array.map(item => item.category).flat()

        // filter out empty strings
        const filtered_categories = all_categories.filter(item => item !== "")

        // add custom categories
        filtered_categories.push("Fleisch", "Gemüse", "Obst", "Milchprodukte", "Getreideprodukte", "Fisch", "Hülsenfrüchte", "Süßigkeiten", "Gewürze", "Nüsse und Samen", "Vollkornprodukte", "Pilze", "Öle und Fette", "Eier", "Alkoholische Getränke", "Softdrinks", "Tiefkühlkost", "Konserven", "Bio-Lebensmittel", "Snacks")

        // filter out duplicates
        const unique_categories = [...new Set(filtered_categories)]

        console.log("getcats resarray: " + result)

        // Return the query results as a JSON response with status 200
        res.status(200).json(unique_categories)
        // res.status(200).json(csvArrayToUniqueValues(categories))
    } catch (err) {
        // Log any errors to the console
        console.log(err)
    }
}
