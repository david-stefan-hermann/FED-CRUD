import React, { useEffect, useState, useContext } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LoadingSpinner from "./LoadingSpinner"
import { DatabaseFillAdd } from "react-bootstrap-icons"

import axios from "axios"
import { Link } from "react-router-dom"
import { PostContext } from "../context/postContext"

const TableOfContents = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ postLinks, setPostLinks ] = useState([])

    const { replaceSpaces, currentPostId } = useContext(PostContext)

    // sorting links ################################### s

    function buildTableOfContentsWithIndents(entries, parent_id = "0", level = 0) {
        const result = [];

        // replace null values with 0
        for (const entry of entries) {
            if (entry.parent == null) {
                entry.parent = "0"
            } 
        }

        for (const entry of entries) {
            console.log(entry.parent.localeCompare(parent_id))
        }

        const sortedEntries = entries
            .filter((entry) => entry.parent.localeCompare(parent_id) == 0)
            .sort((a, b) => a.title.localeCompare(b.title));


        for (const entry of sortedEntries) {
            const indents = level + 1;
            const entryWithIndent = {...entry, indents}
        
            result.push(entryWithIndent);
            
            
            const subContents = buildTableOfContentsWithIndents(entries, entry._id, indents);
            if (subContents.length > 0) {
                result.push(...subContents);
            }

        }

        return result;
      }

    // sorting links ################################### - e

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/links/")

                setPostLinks(buildTableOfContentsWithIndents(res.data))
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
        setIsLoading(false)

    }, [currentPostId])

    return (
        <>
            <h3>Table Of Contents</h3>
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }
            {console.log("toc: " + postLinks.length)}
            { postLinks.map(post => {
                const indentsAsArray = Array.from({ length: post.indents - 1})
                
                return (
                    <Row className="toc-row">
                        <Col sm={12}>
                            {indentsAsArray.map(i => {
                                return(<span className={ post._id == currentPostId ? "active cursor-pointer" : "cursor-pointer not-active"}>. . </span>)
                            })}
                            <Link 
                                to={"/" + post._id + "/" + replaceSpaces(post.title)}
                                key={"toc-" + post._id} 
                                className={ post._id == currentPostId ? "active toc-link" : "toc-link text-decoration-none"} 
                            >{post.title}</Link>
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