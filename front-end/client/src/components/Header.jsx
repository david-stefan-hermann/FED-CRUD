import React, { useContext } from "react"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { Link } from "react-router-dom"

const Header = () => {

    return (
        <header>
            <Navbar expand="lg" variant="dark" bg="dark" className="fw-normal">
                <Container>
                    <Navbar.Brand 
                            href="/"
                        ><img
                        alt=""
                        src={process.env.PUBLIC_URL + "/fed-logo.png"}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    /></Navbar.Brand>
                    <Navbar.Brand 
                        className="background-color-text" 
                        href="/"
                    ><span className="fw-bold">
                        Bits&Bites &nbsp;
                    </span>
                    <span>
                        –&nbsp; IT Studenten entdecken die Kochwelt    
                    </span>
                    </Navbar.Brand>
                    <Nav.Link href="#home">Home</Nav.Link>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header