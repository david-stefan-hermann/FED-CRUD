import React, { useEffect, useState, useContext } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LoadingSpinner from "./LoadingSpinner.tsx"
import { Link, useNavigate } from "react-router-dom"
import ReactMarkdown from 'react-markdown';
import RecipeMetaData from "./RecipeMetaData.tsx"
import RecipeImage from "./RecipeImage.tsx"

import axios from "axios"
import { PostContext } from "../context/postContext.tsx"
import PostInterface from "../interfaces/postInterface.tsx"

const Recipes = () => {
    const postContext = useContext(PostContext)
    // check if postContext is defined
    if (!postContext) {
        // handle if context is not available
        return <LoadingSpinner></LoadingSpinner>;
    }
    const { replaceSpaces, currentPostId } = postContext

    const [ isLoading, setIsLoading ] = useState(true)
    const [ posts, setPosts ] = useState<PostInterface[]>()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/essi/")
                setPosts(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
        setIsLoading(false)
    }, [currentPostId])

    useEffect(() => {
        posts === undefined ? setIsLoading(true) : setIsLoading(false)
    }, [posts])

    const handleLink = (post: PostInterface) => {
        console.log("pl: l")
        navigate("/" + post.id + "/" + replaceSpaces(post.title))
    }

    return (
        <>
            { (posts && posts.length >= 1) ? <h3>Rezepte</h3> : ""}
            { (isLoading || !posts) ? <LoadingSpinner></LoadingSpinner> : 
            <>
            {posts.map(post => {
                return (
                    <Row key={"recipes-" + post.id}>
                        <Col sm={12} className="ms-2 my-2 py-3 card-hover"
                        onClick={() => handleLink(post)}>
                            <Row>
                                <Col sm={5} className="ps-3">
                                    <RecipeImage image={post.id.toString()} title={post.title}></RecipeImage>
                                </Col>
                                <Col sm={7}>
                                    <h4 className='font-weight-light'>{post.title}</h4>

                                    <RecipeMetaData 
                                    rating={post.rating} 
                                    category={post.category}
                                    author={post.author}
                                    updated={post.updated}
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
            }
        </>
    )
}

export default Recipes