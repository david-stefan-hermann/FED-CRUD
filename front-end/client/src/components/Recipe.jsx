import React, { useContext, useEffect, useState } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"
import LoadingSpinner from "./LoadingSpinner"
import { PencilFill } from "react-bootstrap-icons"

import axios from "axios"
import { PostContext } from "../context/postContext"
import { Link } from "react-router-dom"
import ReactMarkdown from 'react-markdown';
import RecipeMetaData from "./RecipeMetaData.tsx"
import RecipeImage from "./RecipeImage.tsx"

const Recipe = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ post, setPost ] = useState({})
    const { currentPostId } = useContext(PostContext)
    
    useEffect(() => {
        console.log(" >> Recipe: id: " + currentPostId)
        const fetchData = async () => {
            try {
                const res = await axios.get("/essi/" + currentPostId)
                setPost(res.data)
                console.log("recipe: " + post.title)
            } catch(err) {
                console.log(err.response)
            }
        }
        fetchData()
        setIsLoading(false)
    }, [currentPostId])

    return (
        <Col sm={12}>
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
            <Row>
                <h1 className='font-weight-light'>{post?.title}</h1>
                
                <RecipeMetaData 
                rating={post?.rating} 
                category={post?.category}
                author={post?.author}
                updated={post?.updated}
                ></RecipeMetaData>

                <Link 
                    to={"edit"}
                    className="text-decoration-none mb-4" 
                ><PencilFill /> Diesen Beitrag bearbeiten</Link>
           
                <ReactMarkdown>{post?.desc}</ReactMarkdown>

                <RecipeImage image={post?.id}></RecipeImage>
                
                <hr className="my-4"></hr>
                <h2>Zubereitung</h2>
                <ReactMarkdown>{post?.recipe}</ReactMarkdown>
            </Row>
        </Col>
    )
}

export default Recipe