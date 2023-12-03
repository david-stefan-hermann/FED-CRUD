import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { PencilFill } from "react-bootstrap-icons"

import { usePostContext } from "../context/postContext.tsx"
import LoadingSpinner from "./LoadingSpinner.tsx"
import ReactMarkdown from 'react-markdown'
import RecipeMetaData from "./RecipeMetaData.tsx"
import RecipeImage from "./RecipeImage.tsx"
import PostInterface from "../interfaces/postInterface.tsx"
import remarkGfm from 'remark-gfm'


const Recipe = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ post, setPost ] = useState<PostInterface | null>()
    const { currentPostId } = usePostContext()

    useEffect(() => {
        console.log(" >> Recipe: id: " + currentPostId)
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8800/api/essi/" + currentPostId)
                setPost(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [currentPostId])

    useEffect(() => {
        post === undefined ? setIsLoading(true) : setIsLoading(false)
    }, [post])

    return (
        <Col sm={12}>
            { (isLoading || !post) ? <LoadingSpinner></LoadingSpinner> : 
            <Row>
                <RecipeMetaData
                big={true}
                title={post.title}
                rating={post.rating} 
                category={post.category}
                author={post.author}
                updated={post.updated}
                noDate={false}
                ></RecipeMetaData>

                <Link 
                    to={"edit"}
                    className="text-decoration-none mb-4" 
                ><PencilFill /> Diesen Beitrag bearbeiten</Link>
           
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.short}</ReactMarkdown>

                <RecipeImage image={post.image} title={post.title}></RecipeImage>
                
                <hr className="my-4"></hr>
                <h2>Zubereitung</h2>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.recipe}</ReactMarkdown>
            </Row>
            }
        </Col>
    )
}

export default Recipe