import axios from "axios"
import React from "react"
import { useEffect, useState } from "react"
import { HandThumbsUpFill, HandThumbsUp } from "react-bootstrap-icons"
import { useAuthContext } from "../context/authContext"

const LikeCounter = (props: {title: string, id: string}) => {
    const { currentUser } = useAuthContext()
    
    const [ userLiked, setUserLiked ] = useState(false)
    const [ likes, setLikes ] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            // fetch likes from database
            try {
                const res = await axios.get("http://localhost:8800/api/likes/" + props.id)
                setLikes(res.data)
            } catch(err) {
                console.log(err)
            }
            
            // setLikes(likes)
        }

        fetchData()
    }, [likes])

    const handleChange = async () => {
        // change liked status
        setUserLiked(!userLiked)
        try {
            await axios.put("http://localhost:8800/api/likes/" + props.id, {userID: currentUser.id})
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setUserLiked(false)
        setLikes(0)
    }, [props.title])

    return (
        <h6 className="float-end">
            <span className="c-dark">{likes}</span>
            {
                currentUser ?
                    <span className="cursor-pointer likes" onClick={handleChange}>{ currentUser?.likes.includes(props.id) ? <HandThumbsUpFill className="active"></HandThumbsUpFill> : <HandThumbsUp className="c-dark"></HandThumbsUp> }</span>
                : ""
            }
        </h6>
    )
}

export default LikeCounter