import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Image from "react-bootstrap/esm/Image"


const About = () => {
    return (
        <Container className="my-4">
            <Row className="align-items-center">
                <Col md={6}>
                    <Image 
                        src="/about.png" 
                        alt="About"
                        style={{ width: '90%' }}
                    ></Image>
                </Col>
                <Col md={6}>
                    <h2>Über uns</h2>
                    <p>Herzlich willkommen auf unserer Webseite, dem gemütlichen Treffpunkt für IT-Studenten mit einer Leidenschaft fürs Kochen! Wir sind stolz darauf, eine bunte Palette an kreativen und leckeren Rezepten zu präsentieren, die von unseren talentierten IT-Studenten kreiert wurden.</p>
                    <p>Unsere Rezepte sind nicht nur eine Freude für den Gaumen, sondern auch eine Hommage an die Welt der Informationstechnologie. Tritt ein, lass dich inspirieren und entdecke, wie Technik und Kulinarik auf köstliche Weise verschmelzen können!</p>
                    <Link to="/Rezepte"><Button variant="primary">Sieh dir unsere Rezepte an!</Button></Link>
                </Col>
            </Row>
        </Container>
    );
};

export default About
