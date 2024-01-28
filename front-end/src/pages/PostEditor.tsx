import React from "react"
import { useEffect, useState } from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { Trash, Upload, ArrowLeftCircleFill } from "react-bootstrap-icons"

import axios from "axios"
import { Link, useLocation, useNavigate } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import LoadingSpinner from "../components/LoadingSpinner.tsx"
import moment from "moment"
import EditorInputText, { EditorInputFile, EditorInputRating } from "../components/inputs/EditorInput.tsx"
import { EditorPreviewFile } from "../components/inputs/EditorPreview.tsx"
import { usePostContext } from "../context/postContext.tsx"
import CustomClickableBadgeHandler from "../components/inputs/CustomClickableBadge.tsx"
import RecipeMetaData from "../components/recipes/RecipeMetaData.tsx"
import remarkGfm from 'remark-gfm'
import { useAuthContext } from "../context/authContext.tsx"
import { newBlankPost } from "../interfaces/postInterface.tsx"


const PostEditor = (props: {creatingNewPost: boolean}) => {
    const { currentUser } = useAuthContext()

    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState(true)
    const { newPost, setNewPost, replaceSpaces } = usePostContext()

    const postIdFromUrl = useLocation().pathname.split("/")[2]
    
    const resetNewPost = () => {
        setNewPost({...newBlankPost})
    }

    // check if there is a post from url
    useEffect(() => {
        if (!props.creatingNewPost) {
            const fetchData = async () => {
                try {
                    const res = await axios.get("http://localhost:8800/api/essi/" + postIdFromUrl)
                    
                    setNewPost(res.data)
                } catch(err) {
                    console.log(err)
                }
            }
            fetchData()
        } else {
            resetNewPost()
        }

        setIsLoading(false)

        // set updated as a fallback value for the case that it wont load on time when presing button
        setNewPost({
            ...newPost,
            updated: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            author: currentUser?.username
        })

    }, [props.creatingNewPost])
    
    const handleDelete = async() => {
        if (!window.confirm("Soll dieser Beitrag wirklich gelöscht werden?"))
            return

        try {
            await axios.delete("http://localhost:8800/api/essi/" + postIdFromUrl)
            navigate("/Rezepte/")
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
                const response = await axios.post("http://localhost:8800/api/essi/", {newPost})
                const location = response.headers.location
                navigate(location + "/" + replaceSpaces(newPost.title))
            } catch(err) {
                console.log(err)
            }
        } else {
            // Update
            if (!window.confirm("Soll der Beitrag geupdated werden?"))
                return

            try {
                const response = await axios.put("http://localhost:8800/api/essi/" + postIdFromUrl, {newPost})
                navigate("/Rezepte/" + postIdFromUrl + "/" + replaceSpaces(newPost.title))
            } catch(err) {
                console.log(err)
            }
        }

        // reset newPost
        resetNewPost()
    }

    useEffect(() => {
        console.log("PostEditor np: " + JSON.stringify(newPost))
        console.log("PostEditor np: " + newPost.image)
    }, [newPost])


    return (
        <>
        { isLoading ? <LoadingSpinner></LoadingSpinner> : <>
        <ControlBar id={props.creatingNewPost ? "" : newPost._id} creatingNewPost={props.creatingNewPost} handleDelete={handleDelete} handleUpdate={handleUpdate} handleOnclick={resetNewPost} ></ControlBar>
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
                    noDate={true}
                    post={newPost}
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
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{newPost?.short}</ReactMarkdown>
                </Col>
            </Row>
            <Row className="p-3 m-3">                
                <Col sm={6}>
                    {/* recipe */}
                    <EditorInputText name={"recipe"} title={"Rezept"} size={300}></EditorInputText>
                </Col>
                <Col sm={6}>
                    {/* recipe */}
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{newPost?.recipe}</ReactMarkdown>
                </Col>
            </Row>
            <ControlBar id={props.creatingNewPost ? "" : newPost._id} creatingNewPost={props.creatingNewPost} handleDelete={handleDelete} handleUpdate={handleUpdate} handleOnclick={resetNewPost} ></ControlBar>
        </> }
        </>
    )
    

}

export default PostEditor


const ControlBar = (props: {id: string; creatingNewPost: boolean; handleDelete: () => void; handleUpdate: () => void; handleOnclick: () => void }) => {
    return (
        <Row className="p-3 m-3">
            <Col sm={12}>
                <Link to={"/Rezepte/" + props.id} onClick={e => props.handleOnclick()} className="text-decoration-none me-3"><ArrowLeftCircleFill />&nbsp; zurück</Link>
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