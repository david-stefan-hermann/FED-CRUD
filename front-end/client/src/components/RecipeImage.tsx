import { useState } from "react"
import Image from "react-bootstrap/esm/Image"
import { usePostContext } from "../context/postContext"


const RecipeImage = (props: { image: string; title: string }) => {
    const [ imageExists, setImageExists ] = useState(false)
    const { replaceSpaces } = usePostContext()
    const noImage = process.env.PUBLIC_URL + ("/no-image.png")
    const url = process.env.PUBLIC_URL + ("/posts/" + props.image + ".png")

    // check if image exists
    fetch(url, { method: 'HEAD' })
        .then(res => {
            if (res.ok) {
                setImageExists(true)
            } else {
                setImageExists(false)
            }
            console.log("rimage: " + imageExists)
        })
        .catch(err => console.log("RecipeImage (fetch image): ", err.response))
    
    return (
        <>
            {
            !imageExists ?
            <Image
                src={url}
                alt={replaceSpaces(props.title)}
                fluid
            ></Image> :
            <Image
                src={noImage}
                alt={"Image does not exist."}
                fluid
            ></Image>
            }
        </>
    )
}

export default RecipeImage