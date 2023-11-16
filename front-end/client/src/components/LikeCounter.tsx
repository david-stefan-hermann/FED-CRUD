import { useEffect, useState } from "react"
import { HandThumbsUpFill, HandThumbsUp } from "react-bootstrap-icons"

const LikeCounter = (props: {title: string}) => {
    const [ userLiked, setUserLiked ] = useState(false)
    const [ likes, setLikes ] = useState(0)

    const handleChange = () => {
        // change liked status
        setUserLiked(!userLiked)
        if (!userLiked) {
            setLikes(likes + 1)
        } else {
            setLikes(likes - 1)
        }
    }

    useEffect(() => {
        setUserLiked(false)
        setLikes(0)
    }, [props.title])

    return (
        <h6 className="float-end">
            <span className={ likes <= 0 ? "c-dark" : "active" }>{likes}</span>    
            <span className="cursor-pointer likes" onClick={handleChange}>{ userLiked ? <HandThumbsUpFill className="active"></HandThumbsUpFill> : <HandThumbsUp className="c-dark"></HandThumbsUp> }</span>
        </h6>
    )
}

export default LikeCounter