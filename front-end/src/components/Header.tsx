import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Link, useLocation } from "react-router-dom"
import { useAuthContext } from "../context/authContext"
import { Nav } from "react-bootstrap"


const Header = () => {
    const [IpAddress, setIpAddress] = useState<String>("")
    const location = useLocation()

    // just for fun
    console.log("Your IP is: " + IpAddress)

    const { currentUser } = useAuthContext()

    // get and set user IP
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://api.ipify.org/?format=json")
                setIpAddress(res.data.ip)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    return (
        <header>
            <Navbar expand="lg" className="c-dark background-dark">
                <Container className="background-color-text me-auto px-4">
                    <Navbar.Brand href="/Rezepte/"><img
                        alt="Bits&Bites Logo"
                        src={process.env.PUBLIC_URL + "/fed-logo.png"}
                        width="70"
                        height="70"
                        className=""
                    /></Navbar.Brand>
                    <Navbar.Brand href="/" className={
                            location.pathname.split('/')[1] === "About" ? 
                            "header-link header-link-active" :
                            "header-link"}>IT Studenten entdecken die Kochwelt
                        </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Rezepte/" className={
                            location.pathname.split('/')[1] === "Rezepte" ? 
                            "header-link header-link-active" :
                            "header-link"}>Rezepte
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        { currentUser ?
                            <Navbar.Text>Hallo {currentUser.username}, <Link to="/Auth/Logout">ausloggen?</Link></Navbar.Text>
                            :
                            <Navbar.Text><Link className="background-color-text" to="/Auth/Login">zum Login..</Link></Navbar.Text>
                        }
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header