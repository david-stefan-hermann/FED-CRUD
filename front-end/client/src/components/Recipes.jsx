import React, { useEffect, useState, useContext } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"
import LoadingSpinner from "./LoadingSpinner"
import { Link, useNavigate } from "react-router-dom"
import ReactMarkdown from 'react-markdown';
import RecipeMetaData from "./RecipeMetaData.tsx"

import axios from "axios"
import { PostContext } from "../context/postContext"

const Recipes = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ posts, setPosts ] = useState([])
    const navigate = useNavigate()

    const { replaceSpaces, currentPostId } = useContext(PostContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/essi/")
                setPosts(res.data)
            } catch(err) {
                console.log(err.response)
            }
        }
        fetchData()
        setIsLoading(false)
    }, [currentPostId])

    const handleLink = (post) => {
        console.log("pl: l")
        navigate("/" + post.id + "/" + replaceSpaces(post.title))
    }

    return (
        <>
            { posts.length >= 1 ? <h3>Rezepte</h3> : ""}
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
            {posts.map(post => {
                return (
                    <Row>
                        <Col sm={12} className="ms-2 my-2 py-3 card-hover"
                        onClick={() => handleLink(post)}>
                            <Row>
                                <Col sm={5} className="ps-3">
                                    <Image src={process.env.PUBLIC_URL + ("/posts/" + post?.id + ".png")} fluid ></Image>
                                </Col>
                                <Col sm={7}>
                                    <h4 className='font-weight-light'>{post.title}</h4>

                                    <RecipeMetaData 
                                    rating={post?.rating} 
                                    category={post?.category}
                                    author={post?.author}
                                    updated={post?.updated}
                                    ></RecipeMetaData>

                                    <ReactMarkdown>{post.desc}</ReactMarkdown>
                                    
                                    <Link 
                                        to={"/" + post.id + "/" + replaceSpaces(post.title)}
                                        key={"recipes-" + post.id} 
                                        className={ post.id == currentPostId ? "active" : "text-decoration-none"} 
                                    >zum Rezept</Link>

                                </Col>
                            </Row>
                        </Col>
                    </Row>
            )})}
        </>
    )
}

export default Recipes