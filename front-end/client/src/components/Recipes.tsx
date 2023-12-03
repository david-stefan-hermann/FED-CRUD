import { useEffect, useState } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LoadingSpinner from "./LoadingSpinner.tsx"
import { Link, useNavigate } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import RecipeMetaData from "./RecipeMetaData.tsx"
import RecipeImage from "./RecipeImage.tsx"

import axios from "axios"
import { usePostContext } from "../context/postContext.tsx"
import PostInterface from "../interfaces/postInterface.tsx"


const Recipes = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ posts, setPosts ] = useState<PostInterface[]>()
    const navigate = useNavigate()
    const { replaceSpaces, currentPostId } = usePostContext()

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

    useEffect(() => {
        posts === undefined ? setIsLoading(true) : setIsLoading(false)
    }, [posts])

    const handleLink = (post: PostInterface) => {
        console.log("pl: l")
        navigate("/Rezepte/" + post.id + "/" + replaceSpaces(post.title))
    }

    return (
        <>
            { (isLoading || !posts) ? <LoadingSpinner></LoadingSpinner> : 
            <>
            {posts.map(post => {
                return (
                    <Row key={"recipes-" + post.id}>
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
                                    ></RecipeMetaData>

                                    <ReactMarkdown>{post.short}</ReactMarkdown>
                                    
                                    <Link 
                                        to={"/Rezepte/" + post.id + "/" + replaceSpaces(post.title)}
                                        key={"recipes-" + post.id} 
                                        className={ post.id === currentPostId ? "active" : "text-decoration-none"} 
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