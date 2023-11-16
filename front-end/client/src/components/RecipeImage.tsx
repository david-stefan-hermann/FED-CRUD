import { useEffect, useState } from "react"
import Image from "react-bootstrap/esm/Image"
import { usePostContext } from "../context/postContext"
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";


const RecipeImage = (props: { image: string; title: string }) => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ imageExists, setImageExists ] = useState(false)
    const { replaceSpaces } = usePostContext()
    const noImage = process.env.PUBLIC_URL + ("/no-image.png")
    const url = process.env.PUBLIC_URL + ("/posts/" + props.image + ".png")

    // check if image exists
    useEffect(() => {
        // this took way too long..
        const fetchData = async () => {
            try {
                const res = await axios.get(url)
                setImageExists(true)
            } catch(err) {
                console.log(err)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [url])
    
    
    return (
        <>
            {isLoading ? <LoadingSpinner></LoadingSpinner> : 
                <>
                {
                imageExists ?
                <Image
                    src={url}
                    alt={replaceSpaces(props.title)}
                    fluid
                ></Image> :
                <Image
                    src={noImage}
                    alt={"Image does not exist."}
                    fluid
                ></Image>
                }
                </>
            }
        </>
    )
}

export default RecipeImage


export const RecipeImageFromBuffer = (props: { image: Buffer | null; title: string }) => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ imageExists, setImageExists ] = useState(false)
    const [ imageUrl, setImgUrl ] = useState("")
    const { replaceSpaces } = usePostContext()
    const noImage = process.env.PUBLIC_URL + ("/no-image.png")
    
    // create blob and image url from buffer
    useEffect(() => {
        const blob = props.image ? new Blob([props.image], { type: 'image/png' }) : null
        if (blob)
            setImgUrl(URL.createObjectURL(blob))
    }, [props.image])
    
    
    // check if image exists
    useEffect(() => {
        // this took way too long..
        const fetchData = async () => {
            try {
                const res = await axios.get(imageUrl)
                setImageExists(true)
            } catch(err) {
                console.log(err)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [imageUrl])

    return (
        <>
            {isLoading ? <LoadingSpinner></LoadingSpinner> : 
                <>
                {
                imageExists ?
                <Image
                    src={imageUrl}
                    alt={replaceSpaces(props.title)}
                    fluid
                ></Image> :
                <Image
                    src={noImage}
                    alt={"Image does not exist."}
                    fluid
                ></Image>
                }
                </>
            }
        </>
    )
}