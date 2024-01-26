import React from "react"
import { useEffect, useState } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LoadingSpinner from "./LoadingSpinner.tsx"
import { Link, useNavigate } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import RecipeMetaData from "./RecipeMetaData.tsx"
import RecipeImage from "./RecipeImage.tsx"
import useFetch, { FetchState } from "../hooks/useFetchItems.tsx"

import axios from "axios"
import { usePostContext } from "../context/postContext.tsx"
import PostInterface from "../interfaces/postInterface.tsx"
import remarkGfm from 'remark-gfm'


const Recipes = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    //const [ posts, setPosts ] = useState<PostInterface[]>()
    const navigate = useNavigate()
    const { replaceSpaces, currentPostId } = usePostContext()

    const { data: posts, fetchState } = useFetch()
    

    /*
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8800/api/essi/")
                setPosts(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
        setIsLoading(false)
    }, [currentPostId])
    */

    useEffect(() => {
        posts === undefined ? setIsLoading(true) : setIsLoading(false)
    }, [posts])

    const handleLink = (post: PostInterface) => {
        console.log("pl: l")
        navigate("/Rezepte/" + post._id + "/" + replaceSpaces(post.title))
    }

    return (
        <>
            { (fetchState === FetchState.Initial || fetchState === FetchState.Loading) ? <LoadingSpinner></LoadingSpinner> : <></>}
            { fetchState === FetchState.Error ? <p>Es ist ein Fehler aufgetreten.</p> : <></>}
            { fetchState === FetchState.Success ? posts.map(post => {
                return (
                    <Row key={"recipes-" + post._id}>
                        <Col sm={12} className="ms-2 my-2 py-3 card-hover">
                            <Row>
                                <Col sm={5} className="ps-3">
                                    <div onClick={() => handleLink(post)} className="cursor-pointer">
                                        <RecipeImage image={post.image} title={post.title}></RecipeImage>
                                    </div>
                                </Col>
                                <Col sm={7}>
                                    <RecipeMetaData
                                    big={false}
                                    title={post.title} 
                                    rating={post.rating} 
                                    category={post.category}
                                    author={post.author}
                                    updated={post.updated}
                                    noDate={false}
                                    id={post._id}
                                    ></RecipeMetaData>

                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.short}</ReactMarkdown>
                                    
                                    <Link 
                                        to={"/Rezepte/" + post._id + "/" + replaceSpaces(post.title)}
                                        key={"recipes-" + post._id} 
                                        className={ post._id === currentPostId ? "active" : "text-decoration-none"} 
                                    >zum Rezept</Link>

                                </Col>
                            </Row>
                        </Col>
                    </Row>
            )}) : <></>}
        </>
    )
}

export default Recipes