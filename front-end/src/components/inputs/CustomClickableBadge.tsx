import React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Badge, Col, Form } from "react-bootstrap"
import LoadingSpinner from "../LoadingSpinner"
import { usePostContext } from "../../context/postContext"

export const CustomClickableBadgeHandler = (props: {name: string; title: string}) => {
    const { newPost, setNewPost, replaceSpaces } = usePostContext()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ categoryArray, setCategoryArray ] = useState<string[]>([])
    const [ postCategories, setPostCategories ] = useState<string[]>([])

    useEffect(() => {
        // remove duplicates
        const uniqueArray = [...new Set(categoryArray)]

        // turn category array into csv string
        const categoriesAsCSV = uniqueArray.join(",").toLocaleLowerCase()

        setNewPost({
            ...newPost,
            [props.name]: categoriesAsCSV
        })
    }, [categoryArray])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8800/api/cats/")
                setPostCategories(res.data)
                setIsLoading(false)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData()
    }, [props.name])

    return (
        <Col sm={12} className="mb-3">
            <Form.Label className="me-2 mb-3 vw-100">{props.title}</Form.Label>
            { (isLoading && newPost.category) ? <LoadingSpinner></LoadingSpinner> :
                postCategories.map(cat => {
                    return (
                        <CustomClickableBadge key={"clickable-badge-" + replaceSpaces(cat)} clicked={newPost.category.includes(cat) ? true : false} title={cat} categoryArray={categoryArray} setCategoryArray={setCategoryArray} ></CustomClickableBadge>
                    )
                })
            }
        </Col>
    )
}

export default CustomClickableBadgeHandler


const CustomClickableBadge = (props: { clicked: boolean; title: string; categoryArray: string[]; setCategoryArray: React.Dispatch<React.SetStateAction<string[]>>}) => {
    const [ isClicked, setIsClicked ] = useState(props.clicked)

    useEffect(() => {
        isClicked ?
        props.setCategoryArray(prevItems => [...prevItems, props.title.toLocaleLowerCase()])
        :
        props.setCategoryArray(prevItems => prevItems.filter(item => item !== props.title.toLocaleLowerCase()))
    }, [isClicked])

    const handleChange = () => {
        setIsClicked(!isClicked)
    }

    return (
        <>
            <Badge className="cursor-pointer me-1" bg={isClicked ? "primary" : "secondary"} onClick={() => handleChange()}>{props.title}</Badge>
        </>
    )
}