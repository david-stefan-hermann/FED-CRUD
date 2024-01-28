import React from "react"
import { useEffect, useState } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LoadingSpinner from "./LoadingSpinner.tsx"
import { Link, useNavigate } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import RecipeMetaData, { RecipeMetaDataRating } from "./RecipeMetaData.tsx"
import RecipeImage from "./RecipeImage.tsx"
import useFetch, { FetchState } from "../hooks/useFetchItems.tsx"

import axios from "axios"
import { usePostContext } from "../context/postContext.tsx"
import PostInterface from "../interfaces/postInterface.tsx"
import remarkGfm from 'remark-gfm'
import { Card, CardImgOverlay } from "react-bootstrap"


const Recipes = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    //const [ posts, setPosts ] = useState<PostInterface[]>()
    const navigate = useNavigate()
    const { replaceSpaces, validateImage, currentPostId } = usePostContext()

    const { data: posts, fetchState } = useFetch()

    useEffect(() => {
        posts === undefined ? setIsLoading(true) : setIsLoading(false)
    }, [posts])

    const handleLink = (post: PostInterface) => {
        console.log("pl: l")
        navigate("/Rezepte/" + post._id + "/" + replaceSpaces(post.title))
    }

    return (
        <Col>
            <h1>Rezepte</h1>
            <Row xs={1} md={3} className="g-4">
                { (fetchState === FetchState.Initial || fetchState === FetchState.Loading) ? <LoadingSpinner></LoadingSpinner> : <></>}
                { fetchState === FetchState.Error ? <p>Es ist ein Fehler aufgetreten.</p> : <></>}
                { fetchState === FetchState.Success ? posts.map((post, idx) => (
                    <Col key={idx}>
                    <Card className="recipes-card">
                        <Card.Img variant="top" src={validateImage(post.image)} alt={post.title} />
                        <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <RecipeMetaDataRating post={post}></RecipeMetaDataRating>
                        <Card.Text><ReactMarkdown remarkPlugins={[remarkGfm]}>{post.short}</ReactMarkdown></Card.Text>
                        <Link 
                            to={"/Rezepte/" + post._id + "/" + replaceSpaces(post.title)}
                            key={"recipes-" + post._id} 
                        >weiterlesen...</Link>
                        </Card.Body>
                    </Card>
                    </Col>
                )) : <></>}
            </Row>
        </Col>
    )
}

export default Recipes