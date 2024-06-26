import axios from "axios"
import React from "react"
import { useEffect, useState } from "react"
import { HandThumbsUpFill, HandThumbsUp, HeartFill, Heart } from "react-bootstrap-icons"
import { useAuthContext } from "../context/authContext"


const LikeCounter = (props: {title: string, id: string}) => {
    const { currentUser } = useAuthContext()
    
    const [ userLiked, setUserLiked ] = useState(false)
    const [ likes, setLikes ] = useState(0)

    const [ observe, setObserve ] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            // fetch likes from database
            try {
                const res = await axios.post("http://localhost:8800/api/likes/" + props.id, {userID: currentUser?.id})
                setLikes(res.data.likes)
                setUserLiked(res.data.liked)
            } catch(err) {
                console.log(err)
            }
            
            // setLikes(likes)
        }

        fetchData()
    }, [observe])

    const handleChange = async () => {
        // change liked status
        try {
            await axios.put("http://localhost:8800/api/likes/" + props.id, {userID: currentUser.id})
            setObserve(!observe)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <span className="float-end">
            <span className="c-dark">{likes}</span>
            {
                currentUser ?
                    <span className="cursor-pointer likes" onClick={handleChange}>{ userLiked ? 
                    <HeartFill className="active"></HeartFill> : 
                    <Heart className="c-dark"></Heart> }</span>
                : <span> <HeartFill className="active"></HeartFill></span>
            }
        </span>
    )
}

export default LikeCounter