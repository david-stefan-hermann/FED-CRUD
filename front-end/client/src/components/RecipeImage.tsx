import { useEffect, useState } from "react"
import Image from "react-bootstrap/esm/Image"
import { usePostContext } from "../context/postContext"
import axios from "axios"
import LoadingSpinner from "./LoadingSpinner"


const RecipeImage = (props: { image: string; title: string }) => {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ imageExists, setImageExists ] = useState(false)
    
    const { replaceSpaces } = usePostContext()
    
    const noImage = process.env.PUBLIC_URL + ("/no-image.png")

    // check if image exists
    useEffect(() => {
        // this took way too long..
        const fetchData = async () => {
            try {
                const res = await axios.head(props.image, { cache: false })

                if (res.headers['content-type'].startsWith('image/')) {
                    // The resource is an image
                    setImageExists(true)
                } else {
                    // The resource is not an image
                    setImageExists(false)
                }
                
            } catch(err) {
                console.log(err)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [props.image])

    
    return (
        <>
            {isLoading ? <LoadingSpinner></LoadingSpinner> : 
                <>
                {
                imageExists ?
                <Image
                    src={props.image}
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