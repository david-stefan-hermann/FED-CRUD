import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";

export const CustomClickableBadgeHandler = () => {
    const [ categoryArray, setCategoryArray ] = useState<string[]>([])

    useEffect(() => {
        console.log("CCBH: " + JSON.stringify(categoryArray))

    }, [categoryArray])

    return (
        <>
            <CustomClickableBadge clicked={false} title="Fleisch" categoryArray={categoryArray} setCategoryArray={setCategoryArray} ></CustomClickableBadge>
        </>
    )
}

export default CustomClickableBadgeHandler


const CustomClickableBadge = (props: { clicked: boolean; title: string; categoryArray: string[]; setCategoryArray: React.Dispatch<React.SetStateAction<string[]>>}) => {
    const [ isClicked, setIsClicked ] = useState(true)
    
    const handleChange = () => {
        setIsClicked(!isClicked)

        isClicked ?
        props.setCategoryArray(prevItems => [...prevItems, props.title.toLocaleLowerCase()])
        :
        props.setCategoryArray(prevItems => prevItems.filter(item => item !== props.title.toLocaleLowerCase()))
    }

    return (
        <>
            <Badge onClick={() => handleChange()}>{props.title}</Badge>
        </>
    )
}