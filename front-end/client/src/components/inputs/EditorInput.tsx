import { Col, FloatingLabel, Form } from "react-bootstrap"
import { usePostContext } from "../../context/postContext"
import { useEffect, useState } from "react"
import { Star, StarFill } from "react-bootstrap-icons"
import PostInterface from "../../interfaces/postInterface"

const EditorInputText = (props: {title: string; size: number; name: string}) => {
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
            name={props.name} value={newPost[props.name as keyof PostInterface] as string} onChange={e => handleChange(e.target)}
            className="input-field mb-3" as="textarea" style={{ height: props.size + "px" }}
            />
        </FloatingLabel>
    )
}
export default EditorInputText


export const EditorInputFile = (props: {title: string; name: string}) => {
    const { newPost, setNewPost } = usePostContext()

    const handleChange = async (t: EventTarget) => {
        const target = t as HTMLInputElement
        if (!target || !target.files)
            return

        // get file
        const file = target.files[0]

        // return if no file
        if (!file) {
            return
        }

        // convert to jpg

        // read file
        const toBase64 = (imageFile: File) => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = reject
        })

        setNewPost({
            ...newPost,
            [target.name]: await toBase64(file) as string
        })
    }
    
    return (
        <>
            <Form.Control className="input-field mb-3" name={props.name} type="file" onChange={e => handleChange(e.target)} accept="image/*" />
        </>
    )
}


export const EditorInputRating = (props: {title: string}) => {
    const { newPost, setNewPost } = usePostContext()
    const [ localRating, setLocalRating ] = useState(0)

    useEffect(() => {
        setLocalRating(newPost.rating)
    }, [newPost.rating])

    const handleChange = (val: number) => {
        // correct input
        let value: number = val

        // greater than 5 (max rating)
        value = value >= 5 ? 5 : value

        // smaller than 0 (min rating)
        value = value <= 0 ? 0 : value

        setNewPost({
            ...newPost,
            rating: value
        })
            
    }
    
    return (
        <Col sm={12} className="mb-3" >
            <Form.Label className="me-2 mb-3">{props.title}</Form.Label>
            {
                Array.from({ length: 5 }, (_, idx) => (
                    <span key={"rating-star-input-" + idx} onClick={() => handleChange(idx + 1)}>
                    {idx < localRating ? <StarFill className="not-active"></StarFill> : <Star className="dark"></Star>}
                </span>
            ))
        }
        </Col>
    )
}
