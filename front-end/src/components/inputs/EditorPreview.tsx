import React from "react"
import { Badge } from "react-bootstrap"
import RecipeImage from "../RecipeImage"
import { usePostContext } from "../../context/postContext"
import PostInterface from "../../interfaces/postInterface"

const EditorPreview = (props: {name: string}) => {
    const { newPost } = usePostContext()

    return (
        <>
            {!props.name ? 
                <Badge bg="danger">Eingabe fehlt</Badge> :
                <h4 className="mb-4">{newPost[props.name as keyof PostInterface]}</h4>
            }
        </>
    )
}
export default EditorPreview


export const EditorPreviewFile = (props: {name: string}) => {
    const { newPost } = usePostContext()
    return (
        <>
            { !props.name ? 
                <Badge bg="danger">Eingabe fehlt</Badge> :
                <RecipeImage image={newPost.image} title={"Editor Image"}></RecipeImage>
            }
        </>
    )
}