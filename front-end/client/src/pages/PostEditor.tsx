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
import { Link, useLocation, useNavigate } from "react-router-dom"
import ReactMarkdown from 'react-markdown';
import LoadingSpinner from "../components/LoadingSpinner.tsx"
import moment from "moment"
import EditorInputText, { EditorInputFile, EditorInputRating } from "../components/inputs/EditorInput.tsx"
import { EditorPreviewFile } from "../components/inputs/EditorPreview.tsx"
import { usePostContext } from "../context/postContext.tsx"
import CustomClickableBadgeHandler from "../components/inputs/CustomClickableBadge.tsx"
import RecipeMetaData from "../components/RecipeMetaData.tsx"

const PostEditor = (props: {creatingNewPost: boolean}) => {
    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState(true)
    const { newPost, setNewPost } = usePostContext()
    
    const postIdFromUrl = useLocation().pathname.split("/")[2]
    
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
        if (!window.confirm("Soll dieser Beitrag wirklich gelöscht werden?"))
            return

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
            updated: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        })

        if (props.creatingNewPost) {
            // Post
            if (!window.confirm("Soll der Beitrag veröffentlicht werden?"))
                return

            try {
                await axios.post("/essi/", {newPost})
                navigate("/")
            } catch(err) {
                console.log(err)
            }
        } else {
            // Update
            if (!window.confirm("Soll der Beitrag geupdated werden?"))
                return

            try {
                await axios.put("/essi/" + postIdFromUrl, {newPost})
                navigate("/")
            } catch(err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        console.log("PostEditor np: " + JSON.stringify(newPost))
        console.log("PostEditor np: " + newPost.image)
    }, [newPost])


    return (
        <>
        { isLoading ? <LoadingSpinner></LoadingSpinner> : <>
        <ControlBar creatingNewPost={props.creatingNewPost} handleDelete={handleDelete} handleUpdate={handleUpdate} ></ControlBar>
            <Row className="p-3 m-3">                
                <Col sm={6}>
                    {/* title */}
                    <EditorInputText name={"title"} title={"Titel"} size={60}></EditorInputText>
                    {/* image */}
                    <EditorInputFile name={"image"} title={"Bild"}></EditorInputFile>
                    {/* categories */}
                    <CustomClickableBadgeHandler name={"category"} title={"Kategorie"}></CustomClickableBadgeHandler>
                    {/* author */}
                    <EditorInputText name={"author"} title={"Autor"} size={60}></EditorInputText>
                    {/* rating */}
                    <EditorInputRating title={"Bewertung"}></EditorInputRating>
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
                    
                    <Row>
                        <Col sm={6} className="mx-auto">
                        {/* image */}
                        <EditorPreviewFile name="image"></EditorPreviewFile>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="p-3 m-3">
                <Col sm={6}>
                    {/* description */}
                    <EditorInputText name={"short"} title={"Beschreibung"} size={200}></EditorInputText>
                </Col>
                <Col sm={6}>
                    {/* description */}
                    <ReactMarkdown>{newPost.short}</ReactMarkdown>
                </Col>
            </Row>
            <Row className="p-3 m-3">                
                <Col sm={6}>
                    {/* recipe */}
                    <EditorInputText name={"recipe"} title={"Rezept"} size={300}></EditorInputText>
                </Col>
                <Col sm={6}>
                    {/* recipe */}
                    <ReactMarkdown>{newPost.recipe}</ReactMarkdown>
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