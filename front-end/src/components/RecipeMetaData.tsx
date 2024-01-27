import React from "react"
import { StarFill, Star } from "react-bootstrap-icons"
import Badge from 'react-bootstrap/Badge'
import Moment from 'moment'
import LikeCounter from "./LikeCounter"
import { Row } from "react-bootstrap"
import PostInterface from "../interfaces/postInterface"


const RecipeMetaData = (props: { big: boolean; noDate: boolean; post: PostInterface}) => {
    
    // categories for badges
    const categories: Record<string, string> = {
        "fleisch": "info",
        "gemüse": "success",
        "obst": "success",
        "milchprodukte": "info",
        "getreideprodukte": "info",
        "fisch": "success",
        "hülsenfrüchte": "success",
        "süßigkeiten": "danger",
        "gewürze": "info",
        "nüsse und samen": "success",
        "vollkornprodukte": "success",
        "pilze": "info",
        "öle und fette": "warning",
        "eier": "info",
        "alkoholische getränke": "danger",
        "softdrinks": "danger",
        "tiefkühlkost": "warning",
        "konserven": "warning",
        "bio-lebensmittel": "success",
        "snacks": "danger"
    }

    return (
        <>
            {props.big ? 
                <h1>{props.post?.title}</h1> :
                <h3 className='font-weight-light'>{props.post?.title}</h3>
            }
            
            {/* rating, display 5 stars and |rating| * filled star */}
            <h6>
            {
            Array.from({ length: 5 }, (_, idx) => (
                <span key={"rating-star-" + idx} >
                    {idx < props.post?.rating ? <StarFill className="not-active"></StarFill> : <Star className="dark"></Star>}
                </span>
            ))
            }

            { props.noDate ? "" : <LikeCounter title={props.post?.title} id={props.post?._id}></LikeCounter> }
            </h6>

            {/* display different badge per category. categories are hard coded */}
            <h6>
            {
                props.post?.category && props.post.category.map((cat, idx) => (
                    <span key={"cat-badge-" + idx}>
                        <Badge bg={cat.trim().toLowerCase() in categories ? categories[cat.toLowerCase().trim()] : "info"}>{cat.trim()}</Badge>&nbsp;
                    </span>
                ))
            }
            </h6>
            
            {/* Author and last updated */}
            <h6>
            { props.post?.author }
            { props.noDate ? "" : <>,&nbsp;{Moment(props.post?.updated).format("DD.MM.YYYY, HH:mm")}</> }
            </h6>
        </>
    )
}

export default RecipeMetaData