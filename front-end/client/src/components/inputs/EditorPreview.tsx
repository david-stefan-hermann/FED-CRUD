import { Badge } from "react-bootstrap";
import LoadingSpinner from "../LoadingSpinner";
import Image from "react-bootstrap/esm/Image"
import { RecipeImageNewPost } from "../RecipeImage";
import { usePostContext } from "../../context/postContext";
import PostInterface from "../../interfaces/postInterface";

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

//export const EditorPreviewFile = (props: {name: Buffer | null}) => {

export const EditorPreviewFile = (props: {name: string}) => {
    return (
        <>
            { !props.name ? 
                <Badge bg="danger">Eingabe fehlt</Badge> :
                <RecipeImageNewPost name={props.name} title={"Editor Image"}></RecipeImageNewPost>
            }
        </>
    )
}