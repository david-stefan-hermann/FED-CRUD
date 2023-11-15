import React from "react"
import Image from "react-bootstrap/esm/Image"


const RecipeImage = (props: { image: String}) => {

    return (
        <>
            <Image
                width="50%"
                src={process.env.PUBLIC_URL + ("/posts/" + props.image + ".png")}
                fluid
            ></Image>
        </>
    )
}

export default RecipeImage