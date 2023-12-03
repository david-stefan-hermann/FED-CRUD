import { StarFill, Star } from "react-bootstrap-icons"
import Badge from 'react-bootstrap/Badge'
import Moment from 'moment'
import LikeCounter from "./LikeCounter"
import { Row } from "react-bootstrap"


const RecipeMetaData = (props: { big: boolean; title: string; rating: number; category: string; author: string; updated: string; noDate: boolean}) => {
    
    // categories for badges
    const categories: Record<string, string> = {
        "fleisch": "danger",
        "ungesund": "danger",
        "koriander": "warning",
        "veggie": "success",
        "gesund": "success",
        "herzhaft": "info",
        "pfui": "warning"
    }

    return (
        <>
            {props.big ? 
                <h1>{props?.title}</h1> :
                <h3 className='font-weight-light'>{props?.title}</h3>
            }
            
            {/* rating, display 5 stars and |rating| * filled star */}
            <Row className="align-items-center">
                <h6>
                {
                Array.from({ length: 5 }, (_, idx) => (
                    <span key={"rating-star-" + idx} >
                        {idx < props?.rating ? <StarFill className="not-active"></StarFill> : <Star className="dark"></Star>}
                    </span>
                ))
                }

                { props.noDate ? "" : <LikeCounter title={props.title}></LikeCounter> }
                </h6>
            </Row>

            {/* display different badge per category. categories are hard coded */}
            <h6>
            {
                props?.category?.split(',').map((cat, idx) => (
                    <span key={"cat-badge-" + idx}>
                        <Badge bg={cat.trim().toLowerCase() in categories ? categories[cat.toLowerCase().trim()] : "info"}>{cat.trim()}</Badge>&nbsp;
                    </span>
                ))
            }
            </h6>
            
            {/* Author and last updated */}
            <h6>
            { props.author }
            { props.noDate ? "" : <>,&nbsp;{Moment(props.updated).format("DD.MM.YYYY, HH:mm")}</> }
            </h6>
        </>
    )
}

export default RecipeMetaData