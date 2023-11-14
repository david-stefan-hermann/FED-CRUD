import React, { useContext, useEffect, useState, useRef } from "react"
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"
import LoadingSpinner from "./LoadingSpinner"
import { PencilFill } from "react-bootstrap-icons"
import Moment from 'moment'

import axios from "axios"
import { PostContext } from "../context/postContext"
import { useLocation, Link } from "react-router-dom"
import ReactMarkdown from 'react-markdown';

const Recipe = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ post, setPost ] = useState({})
    const { currentPostId, setParentId } = useContext(PostContext)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/posts/" + currentPostId)
                setPost(res.data)
                // set parent id: sub sites will be queried by this id
                setParentId(post.parentid)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
        setIsLoading(false)
    }, [currentPostId])

    return (
        <>
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
            <Row>
                <h1 className='font-weight-light'>{post?.title}</h1>
                <h6 className="fst-italic">{post?.user?.username}, {Moment(post?.updated).format("DD.MM.YYYY, HH:mm")}</h6>

                // edit button
                <Link 
                    to={"edit"}
                    className="text-decoration-none mb-4" 
                ><PencilFill /> Diesen Beitrag bearbeiten</Link> : ""

                <ReactMarkdown>{post?.short}</ReactMarkdown>
            </Row>
            <Row>
                <Container>
                    <Image
                        width="50%"
                        src={post?.image}
                        fluid
                    ></Image>
                </Container>
            </Row>
            <Row>
                <hr className="my-4"></hr>
                <ReactMarkdown>{post?.content}</ReactMarkdown>
            </Row>
        </>
    )
}

export default Recipe