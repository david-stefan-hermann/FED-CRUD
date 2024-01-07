import { useEffect } from "react"
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import axios from "axios"
import { useLocation } from "react-router-dom"
import TableOfContent from "../components/TableOfContent.tsx"
import Recipe from "../components/Recipe.tsx"
import Recipes from "../components/Recipes.tsx"
import { usePostContext } from '../context/postContext.tsx'


const Blog = () => {
    const location = useLocation()
    const { currentPostId, setCurrentPostId } = usePostContext()
    
    useEffect(() => {
        const postIdFromUrl: string = location.pathname.split("/")[2]
        
        setCurrentPostId(postIdFromUrl == "" ? "" : postIdFromUrl)

        console.log("> Blog: new cpi: " + currentPostId)
    }, [location])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/essi/")
                console.log(res)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [currentPostId])

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