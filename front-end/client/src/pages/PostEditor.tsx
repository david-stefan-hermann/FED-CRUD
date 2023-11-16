import React, { useEffect, useState, useContext } from "react"
import Container from "react-bootstrap/esm/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from "react-bootstrap/esm/Image"
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { Trash, Upload, ArrowLeftCircleFill } from "react-bootstrap-icons"

import axios from "axios"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import ReactMarkdown from 'react-markdown';
import LoadingSpinner from "../components/LoadingSpinner.tsx"
import moment from "moment"
import EditorInputText, { EditorInputFile, EditorInputSelect } from "../components/EditorInput.tsx"
import EditorPreview, { EditorPreviewFile } from "../components/EditorPreview.tsx"
import { usePostContext } from "../context/postContext.tsx"
import CustomClickableBadgeHandler from "../components/CustomClickableBadge.tsx"

const PostEditor = (props: {creatingNewPost: boolean}) => {
    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState(true)
    const { newPost, setNewPost } = usePostContext()
    /*
    const blankNewPost = {
        title: "",
        author: "",
        category: "",
        updated: "",
        rating: "",
        desc: "",
        image: "",
        recipe: ""
    }

    const [ post, setPost ] = useState(blankNewPost)
    const [ postLinks, setPostLinks ] = useState([])
    const postIdFromUrl = useLocation().pathname.split("/")[1]
    
    
    useEffect(() => {        
        if (props.creatingNewPost == true) {

        } else {
            
            const fetchData = async () => {
                try {
                    const res = await axios.get("/posts/" + postIdFromUrl)
                    setPost(res.data)
                    console.log("PE: p " + res.data)
                } catch(err) {
                    console.log(err)
                }
            }
            fetchData()
            
        }
        console.log("> pe: post " + post.title)

        setIsLoading(false)

        // load available posts
        const fetchLinks = async () => {
            try {
                const res = await axios.get("/links/")
                setPostLinks(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchLinks()
    }, [])
    
    const handleDelete = async() => {
        try {
            await axios.delete("/posts/" + postIdFromUrl)
            
            console.log("pe: after axios ")
            navigate("/")
        } catch(err) {
            console.log(err)
        }
    }

    const handleUpdate = async() => {
        const parent = post.parent == postIdFromUrl ? null : post.parent
        if (props.creatingNewPost == true) {
            // Post
            try {
                await axios.post("/posts/", {
                    isprivate: post.isprivate,
                    parentid: parent,
                    image: post.image,
                    title: post.title,
                    short: post.short,
                    content: post.content,
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                }).catch(err => {
                    console.log(err)
                })
            } catch(err) {
                console.log(err)
            }
        } else {
            // Update
            try {
                await axios.put("/posts/" + postIdFromUrl, {
                    isprivate: post.isprivate,
                    parentid: parent,
                    image: post.image,
                    title: post.title,
                    short: post.short,
                    content: post.content,
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
                }).catch(err => {
                    console.log(err)
                })
            } catch(err) {
                console.log(err)
            }
        }
    }

    const handleChange = (e: Event) => {
        const target = e.target as HTMLTextAreaElement
        
        // handle text inputs
        setPost({
            ...post,
            [target.name]: target.value
        })
    }

    const handleChangeSelect = (e: Event) => {
        const target = e.target as HTMLSelectElement
        
        // handle text inputs
        setPost({
            ...post,
            [target.name]: target.value
        })
    }

    */


    useEffect(() => {
        setIsLoading(false)
        
    }, [])


    return (
        <>
        { isLoading ? <LoadingSpinner></LoadingSpinner> : <>
            <Row className="p-3 m-3">
                <Link to="/" className="text-decoration-none ms-1"><ArrowLeftCircleFill />&nbsp; zurück</Link>
            </Row>
            <Row className="p-3 m-3">                
                <Col sm={6}>    
                    <EditorInputText value={newPost.title} name={"title"} title={"Titel"} size={60}></EditorInputText>
                    <EditorInputFile name={"image"} title={"Bild"}></EditorInputFile>
                    <CustomClickableBadgeHandler></CustomClickableBadgeHandler>
                </Col>
                <Col sm={6}>
                    <EditorPreview value={newPost.title}></EditorPreview>
                    <EditorPreviewFile value={newPost.image}></EditorPreviewFile>
                </Col>
            </Row>
        </> }
        </>
    )
    /*
    return (
        <>
            { isLoading ? <LoadingSpinner></LoadingSpinner> : null }

            <Row className="bg-dark text-light p-5 m-3 rounded">                
                <Col sm={6}>
                    <Link to="/" className="text-decoration-none ms-1"><ArrowLeftCircleFill />&nbsp; zurück</Link>
                    
                    <FloatingLabel data-bs-theme="dark" className="my-4" label="Titel" >
                        <Form.Control
                        name="title" value={post.title} onChange={e => handleChange(e)}
                        className="box-shadow text-input-field" as="textarea" style={{ height: '100px' }}
                        />
                    </FloatingLabel>

                    <FloatingLabel data-bs-theme="dark" className="mb-4" label="Titelbild URL">
                        <Form.Control
                        name="image" value={post.image} onChange={e => handleChange(e)}
                        className="box-shadow text-input-field" as="textarea" style={{ height: '100px' }}
                        />
                    </FloatingLabel>

                    <FloatingLabel data-bs-theme="dark" className="mb-4" label="Übergeordneter Beitrag">
                        <Form.Select 
                        name="parent" value={post?.parent?.id} onChange={e => handleChange(e)}>
                            <option value="0">kein übergeordneter Beitrag</option>
                            {postLinks?.map(link => {
                                if (link?._id != postIdFromUrl) 
                                {return(
                                    <option value={link?._id}>{link?.title}</option>
                                )}
                            })}
                        </Form.Select>
                    </FloatingLabel>

                    <Form.Check data-bs-theme="dark" className="mb-4"
                        label="privat?" type="switch" defaultValue={post.isprivate} onChange={e => handleChange(e, "switch")}
                    />
                </Col>

                <Col sm={6}>
                    <h4 className="mb-4">{post?.title}</h4>
                    { post?.image ? <Image className="mb-4" src={post.image} fluid></Image> : "Titelbild" }
                </Col>
            </Row>



            <Row className="bg-dark text-light p-5 m-3 rounded">
                <Col sm={6}>
                    <FloatingLabel data-bs-theme="dark" className="mb-4" label="Beschreibung">
                        <Form.Control
                        name="short" value={post.short} onChange={e => handleChange(e)}
                        className="box-shadow text-input-field" as="textarea" style={{ height: '300px' }}
                        />
                    </FloatingLabel>
                </Col>
                <Col sm={6}>
                    { post?.short ? 
                        <>
                        <Container className="box-shadow px-4 background-dark rounded-top">
                            Vorschau
                        </Container>
                        <Container className="box-shadow p-4 mb-4 rounded-bottom">
                            <ReactMarkdown>{post?.short}</ReactMarkdown>
                        </Container>
                        </>
                        :
                        <p>Hier wird die Beschreibung angezeigt</p>
                    }
                </Col>
            </Row>
            <Row className="bg-dark text-light p-5 m-3 rounded">
                <Col sm={6}>
                    <FloatingLabel data-bs-theme="dark" className="mb-4" label="Inhalt">
                        <Form.Control 
                        name="content" value={post.content} onChange={e => handleChange(e)}
                        className="box-shadow text-input-field" as="textarea" style={{ height: '600px' }}
                        />
                    </FloatingLabel>
                    {
                        props.creatingNewPost == true ?
                        "" :
                        <Button variant="dark" className="me-4 border-danger" onClick={handleDelete}><Trash /> &nbsp;Beitrag löschen</Button>
                    }
                    <Button variant="success" onClick={handleUpdate}>
                        <Upload /> &nbsp;{props.creatingNewPost == true ? "Beitrag hochladen" : "Beitrag Updaten"}
                    </Button>

                </Col>


                <Col sm={6}>
                    { post?.content ? 
                        <>
                        <Container className="box-shadow px-4 background-dark rounded-top">
                            Vorschau
                        </Container>
                        <Container className="box-shadow p-4 rounded-bottom">
                            <ReactMarkdown>{post?.content}</ReactMarkdown>
                        </Container>
                        </>
                        :
                        <p>Hier wird der Inhalt angezeigt</p>
                    }
                </Col>
            </Row>
        </>
    )*/
}

export default PostEditor