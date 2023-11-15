import { useEffect, useState, useContext } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LoadingSpinner from "./LoadingSpinner.tsx"
import { DatabaseFillAdd } from "react-bootstrap-icons"

import axios from "axios"
import { Link } from "react-router-dom"
import { PostContext } from "../context/postContext.tsx"


const TableOfContents = () => {
    const { replaceSpaces, currentPostId } = useContext(PostContext)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ postLinks, setPostLinks ] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/links/")
                setPostLinks(res.data)
            } catch(err) {
                console.log(err.response)
            }
        }
        fetchData()
        setIsLoading(false)

    }, [currentPostId])

    return (
        <>
            <h3>Table Of Contents</h3>
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
            { postLinks.map(link => {  
                return (
                    <Row key={"toc-" + link.id} className="toc-row">
                        <Col sm={12}>                            
                            <Link 
                                to={"/" + link.id + "/" + replaceSpaces(link.title)}
                                className={ link.id === currentPostId ? "active toc-link" : "toc-link text-decoration-none"} 
                            >{link.title}</Link>
                        </Col>
                    </Row>
                )
            })}
            <Row className="toc-row mt-3">
                <Col sm={12}>
                    <Link 
                        to="/create" 
                        className="text-decoration-none"
                    ><DatabaseFillAdd /> Beitrag hinzufügen</Link>
                </Col>
            </Row>
        </>
    )
}

export default TableOfContents