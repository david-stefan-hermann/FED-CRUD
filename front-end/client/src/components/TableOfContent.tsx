import { useEffect, useState } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LoadingSpinner from "./LoadingSpinner.tsx"
import { DatabaseFillAdd } from "react-bootstrap-icons"

import axios from "axios"
import { Link } from "react-router-dom"
import { usePostContext } from "../context/postContext.tsx"
import LinkInterface from "../interfaces/linkInterface.tsx"
import { Container } from "react-bootstrap"


const TableOfContent = () => {
    const { replaceSpaces, currentPostId } = usePostContext()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ postLinks, setPostLinks ] = useState<LinkInterface[]>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8800/api/links/")
                setPostLinks(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
        setIsLoading(false)

    }, [currentPostId])

    return (
        <Container className="px-5">
            <h3>Table Of Contents</h3>
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
            { postLinks ? postLinks.map(link => {  
                return (
                    <Row key={"toc-" + link._id} className="toc-row">
                        <Col sm={12}>                            
                            <Link 
                                to={"/Rezepte/" + link._id + "/" + replaceSpaces(link.title)}
                                className={ link._id == currentPostId ? "active toc-link text-decoration-none" : "toc-link text-decoration-none"} 
                            >{link.title}</Link>
                        </Col>
                    </Row>
                )
            }) : ""}
            <Row className="toc-row mt-3">
                <Col sm={12}>
                    <Link 
                        to="/Rezepte/create" 
                        className="text-decoration-none"
                    ><DatabaseFillAdd /> Beitrag hinzufügen</Link>
                </Col>
            </Row>
        </Container>
    )
}

export default TableOfContent