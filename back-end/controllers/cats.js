import { db } from "../db.js"


export const getCats = (req, res) => {
    const q = {
        text: "SELECT category FROM fed_schema.essi"
    }

    db.query(q)
    .then(result => {
        return res.status(200).json(csvArrayToUniqueValues(result.rows))
    })
    .catch(err => {
        return console.log(err)
    })
}

const csvArrayToUniqueValues = csvArray => {    
    // Extract comma-separated strings and split them into individual values
    const allValues = csvArray
        .flatMap(obj => obj.category.split(','))
        .filter((value, index, self) => self.indexOf(value) === index);

    return allValues;
}