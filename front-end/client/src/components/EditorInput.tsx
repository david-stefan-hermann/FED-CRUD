import { FloatingLabel, Form } from "react-bootstrap";
import { usePostContext } from "../context/postContext";
import { access } from "fs";

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
        <FloatingLabel label={props.title} >
            <Form.Control
            name={props.name} value={props.value} onChange={e => handleChange(e.target)}
            className="input-field" as="textarea" style={{ height: props.size + "px" }}
            />
        </FloatingLabel>
    )
}
export default EditorInputText


export const EditorInputFile = (props: {title: string; name: string}) => {
    const { newPost, setNewPost } = usePostContext()

    const handleChange = (t: EventTarget) => {
        const target = t as HTMLInputElement
        if (!target || !target.files)
            return

        // get file
        const file = target.files[0]

        // return if no file
        if (!file) {
            return
        }

        // read file
        const reader = new FileReader()

        reader.onload = function(loadEvent) {
            if (!loadEvent.target)
                return

            const arrayBuffer = loadEvent.target.result

            console.log("EditorInput: " +  arrayBuffer)

            setNewPost({
                ...newPost,
                [target.name]: arrayBuffer
            })
        }
        reader.readAsArrayBuffer(file)
    }
    
    return (
        <>
            <Form.Label>{props.title}</Form.Label>
            <Form.Control className="input-field" name={props.name} type="file" onChange={e => handleChange(e.target)} accept="image/*" />
        </>
    )
}
