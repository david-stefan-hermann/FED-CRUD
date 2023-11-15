import React from "react"
import { StarFill, Star } from "react-bootstrap-icons"
import Badge from 'react-bootstrap/Badge';
import Moment from 'moment'


const RecipeMetaData = (props: { rating: number; category: string; author: string; updated: Date}) => {
    
    // categories for badges
    const categories = {
        "fleisch": "danger",
        "ungesund": "danger",
        "koriander": "warning",
        "veggie": "success",
        "gesund": "success",
        "herzhaft": "info"
    }

    return (
        <>
            {/* rating, display 5 stars and |rating| * filled star */}
            <h6>
            {
            Array.from({ length: 5 }, (_, idx) => (
                <>
                    {idx < props?.rating ? <StarFill className="not-active"></StarFill> : <Star className="dark"></Star>}
                </>
            ))
            }
            </h6>

            {/* display different badge per category. categories are hard coded */}
            <h6>
            {
                props?.category?.split(',').map(cat => (
                    <>
                        <Badge bg={cat.trim().toLowerCase() in categories ? categories[cat.toLowerCase().trim()] : "info"}>{cat.trim()}</Badge>&nbsp;
                    </>
                ))
            }
            </h6>
            
            {/* Author and last updated */}
            <h6>
            { props?.author },&nbsp;
            { Moment(props.updated).format("DD.MM.YYYY, HH:mm") }
            </h6>
        </>
    )
}

export default RecipeMetaData