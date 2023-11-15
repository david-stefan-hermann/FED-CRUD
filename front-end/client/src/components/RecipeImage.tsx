import React, { useState, useContext } from "react"
import Image from "react-bootstrap/esm/Image"
import { PostContext } from "../context/postContext"
import LoadingSpinner from "./LoadingSpinner";


const RecipeImage = (props: { image: string; title: string }) => {
    const postContext = useContext(PostContext)
    // check if postContext is defined
    if (!postContext) {
        // handle if context is not available
        return <LoadingSpinner></LoadingSpinner>;
    }
    const { replaceSpaces } = postContext
    const [ imageExists, setImageExists ] = useState(false)

    const noImage = process.env.PUBLIC_URL + ("/posts/no-image.png")
    const url = process.env.PUBLIC_URL + ("/posts/" + props.image + ".png")

    // check if image exists
    fetch(url, { method: 'HEAD' })
        .then(res => {
            if (res.ok) {
                setImageExists(true)
            } else {
                setImageExists(false)
            }
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