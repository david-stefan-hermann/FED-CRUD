import React, { useContext } from "react"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { Link } from "react-router-dom"

const Header = () => {

    return (
        <header>
            <Navbar expand="lg" className="c-dark background-dark">
                <Container>
                    <Navbar.Brand 
                            href="/"
                        ><img
                        alt=""
                        src={process.env.PUBLIC_URL + "/fed-logo.png"}
                        width="50"
                        height="50"
                        className=""
                    /></Navbar.Brand>
                    <Navbar.Brand 
                        className="background-color-text me-auto" 
                        href="/"
                    ><span className="fw-bold">
                        Bits<span className="not-active">&</span>Bites &nbsp;
                    </span>
                    <span>
                        –&nbsp; IT Studenten entdecken die Kochwelt    
                    </span>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header