import React from "react"
import { useEffect } from "react"
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import axios from "axios"
import { useLocation } from "react-router-dom"
import TableOfContent from "../components/TableOfContent.tsx"
import Recipe from "../components/recipes/Recipe.tsx"
import Recipes from "../components/recipes/Recipes.tsx"
import { usePostContext } from '../context/postContext.tsx'
import { Card } from "react-bootstrap"


const Blog = () => {
    const location = useLocation()
    const { currentPostId, setCurrentPostId } = usePostContext()
    
    useEffect(() => {
        const postIdFromUrl: string = location.pathname.split("/")[2]
        
        setCurrentPostId(postIdFromUrl == "" ? "" : postIdFromUrl)

        console.log("> Blog: new cpi: " + currentPostId)
    }, [location])

    return (
        <main>
            <Container>
                <Row className="my-3">
                    <Col sm={8}>
                        <Row>
                            {currentPostId ? <Recipe></Recipe> : <Recipes></Recipes> }
                        </Row>
                    </Col>
                    <Col sm={4}>
                        <Row className="px-2 my-3">
                            <TableOfContent></TableOfContent>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default Blog