import { Badge } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import Image from "react-bootstrap/esm/Image"
import { RecipeImageFromBuffer } from "./RecipeImage";

const EditorPreview = (props: {value: string}) => {
    return (
        <>
            {!props.value ? 
                <Badge bg="danger">Eingabe fehlt</Badge> :
                <h4 className="mb-4">{props.value}</h4>
            }
        </>
    )
}
export default EditorPreview


export const EditorPreviewFile = (props: {value: Buffer | null}) => {

    return (
        <>
            { !props.value ? 
                <Badge bg="danger">Eingabe fehlt</Badge> :
                <RecipeImageFromBuffer image={props.value} title={"Editor Image"}></RecipeImageFromBuffer>
            }
        </>
    )
}