import { FloatingLabel, Form } from "react-bootstrap";
import { usePostContext } from "../context/postContext";

const EditorInputText = (props: {title: string; size: number; name: string; value: string}) => {
    const { newPost, setNewPost } = usePostContext()
    
    const handleChange = (t: EventTarget) => {
        const target = t as HTMLTextAreaElement
        if (!target)
            return

        setNewPost({
            ...newPost,
            [target.name]: target.value
        })
    }
    
    return (
        <FloatingLabel className="my-4" label={props.title} >
            <Form.Control
            name={props.name} value={props.value} onChange={e => handleChange(e.target)}
            className="box-shadow text-input-field" as="textarea" style={{ height: props.size + "px" }}
            />
        </FloatingLabel>
    )
}



export default EditorInputText