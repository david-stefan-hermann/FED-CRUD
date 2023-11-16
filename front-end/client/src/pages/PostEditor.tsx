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
import EditorInputText, { EditorInputFile, EditorInputRating } from "../components/inputs/EditorInput.tsx"
import EditorPreview, { EditorPreviewFile } from "../components/inputs/EditorPreview.tsx"
import { usePostContext } from "../context/postContext.tsx"
import CustomClickableBadgeHandler from "../components/inputs/CustomClickableBadge.tsx"
import RecipeMetaData from "../components/RecipeMetaData.tsx"

const PostEditor = (props: {creatingNewPost: boolean}) => {
    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState(true)
    const { newPost, setNewPost } = usePostContext()
    
    const postIdFromUrl = useLocation().pathname.split("/")[1]
    
    // check if there is a post from url
    useEffect(() => {
        if (!props.creatingNewPost) {
            const fetchData = async () => {
                try {
                    const res = await axios.get("/essi/" + postIdFromUrl)
                    
                    setNewPost(res.data)
                } catch(err) {
                    console.log(err)
                }
            }
            fetchData()
        }
        setIsLoading(false)
    }, [props.creatingNewPost])
    
    const handleDelete = async() => {
        try {
            await axios.delete("/essi/" + postIdFromUrl)
            navigate("/")
        } catch(err) {
            console.log(err)
        }
    }

    const handleUpdate = async() => {
        setNewPost({
            ...newPost,
            updated: Date.now()
        })

        if (props.creatingNewPost) {
            // Post
            try {
                await axios.post("/posts/", {newPost})
            } catch(err) {
                console.log(err)
            }
        } else {
            // Update
            try {
                await axios.put("/posts/" + postIdFromUrl, {newPost})
            } catch(err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        console.log("PostEditor np: " + JSON.stringify(newPost))
        
    }, [newPost])


    return (
        <>
        { isLoading ? <LoadingSpinner></LoadingSpinner> : <>
        <ControlBar creatingNewPost={props.creatingNewPost} handleDelete={handleDelete} handleUpdate={handleUpdate} ></ControlBar>
            <Row className="p-3 m-3">                
                <Col sm={6}>
                    {/* title */}
                    <EditorInputText name={"title"} value={newPost.title} title={"Titel"} size={60}></EditorInputText>
                    {/* image */}
                    <EditorInputFile name={"image"} title={"Bild"}></EditorInputFile>
                    {/* categories */}
                    <CustomClickableBadgeHandler name={"category"} title={"Kategorie"}></CustomClickableBadgeHandler>
                    {/* author */}
                    {/* rating */}
                    <EditorInputRating title={"Bewertung"}></EditorInputRating>
                    {/* description */}
                    {/* recipe */}
                </Col>
                <Col sm={6}>
                    {/* title, rating, categories, author, rating */}
                    <RecipeMetaData
                    big={true}
                    title={newPost.title}
                    rating={newPost.rating} 
                    category={newPost.category}
                    author={newPost.author}
                    updated={newPost.updated}
                    noDate={true}
                    ></RecipeMetaData>
                    
                    {/* image */}
                    <EditorPreviewFile name="image"></EditorPreviewFile>

                    {/* description */}
                    {/* recipe */}
                </Col>
            </Row>
            <ControlBar creatingNewPost={props.creatingNewPost} handleDelete={handleDelete} handleUpdate={handleUpdate} ></ControlBar>
        </> }
        </>
    )
    

}

export default PostEditor


const ControlBar = (props: {creatingNewPost: boolean; handleDelete: () => void; handleUpdate: () => void }) => {
    return (
        <Row className="p-3 m-3">
            <Col sm={12}>
                <Link to="/" className="text-decoration-none me-3"><ArrowLeftCircleFill />&nbsp; zurück</Link>
                {
                    props.creatingNewPost == true ?
                    "" :
                    <Button variant="danger" className="me-3" onClick={props.handleDelete}>
                        <Trash />&nbsp; Beitrag löschen
                    </Button>
                }
                <Button variant="success" onClick={props.handleUpdate}>
                    <Upload />&nbsp; {props.creatingNewPost == true ? "Beitrag hochladen" : "Beitrag Updaten"}
                </Button>
            </Col>
        </Row>
    )
}