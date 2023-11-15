import React, { useContext, useEffect, useState, useRef } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"
import LoadingSpinner from "./LoadingSpinner"
import { PencilFill, StarFill, Star } from "react-bootstrap-icons"
import Badge from 'react-bootstrap/Badge';

import axios from "axios"
import { PostContext } from "../context/postContext"
import { Link } from "react-router-dom"
import ReactMarkdown from 'react-markdown';

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
                
                <h6>Bewertung: 
                {
                Array.from({ length: 5 }, (_, idx) => (
                    <>&nbsp;
                        {idx < post?.rating ? <StarFill className="not-active"></StarFill> : <Star className="dark"></Star>}
                    </>
                ))
                }
                </h6>

                <h6>Kategorie:
                {
                    post?.category?.split(',').map(cat => (
                        <>&nbsp;
                            <Badge bg="warning">{cat}</Badge>
                        </>
                    ))
                }
                </h6>

                <Link 
                    to={"edit"}
                    className="text-decoration-none mb-4" 
                ><PencilFill /> Diesen Beitrag bearbeiten</Link>
           
                <ReactMarkdown>{post?.desc}</ReactMarkdown>

                <Image
                    width="50%"
                    src={process.env.PUBLIC_URL + ("/posts/" + post?.id + ".png")}
                    fluid
                ></Image>
                
                <hr className="my-4"></hr>
                <h2>Zubereitung</h2>
                <ReactMarkdown>{post?.recipe}</ReactMarkdown>
            </Row>
        </Col>
    )
}

export default Recipe