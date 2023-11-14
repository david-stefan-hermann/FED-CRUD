import React, { useEffect, useState, useContext } from "react"
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"
import Button from 'react-bootstrap/Button'

import axios from "axios"
import { Link, useLocation } from "react-router-dom"
import TableOfContents from "../components/TableOfContents"
import Recipe from "../components/Recipe"
import Recipes from "../components/Recipes"
import { PostContext } from '../context/postContext';

const Blog = () => {
    const { currentPostId, setCurrentPostId } = useContext(PostContext)

    const postIdFromUrl = useLocation().pathname.split("/")[1]
    
    useEffect(() => {
        setCurrentPostId(postIdFromUrl == "" ? 0 : postIdFromUrl)
    }, [postIdFromUrl])

    console.log("Blog: " + postIdFromUrl)
    console.log(currentPostId > 0)
    return (
        <main>
            <Container>
                <Row className="text-light my-3">
                    <Col sm={4}>
                        <Row className="text-light px-2 my-3">
                            <TableOfContents></TableOfContents>
                        </Row>
                    </Col>
                    <Col sm={8}>
                        <Row>
                            {currentPostId != "" ? <Recipe></Recipe> : <Recipes></Recipes> }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default Blog