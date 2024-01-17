import React, { useContext } from "react"
import { useEffect, useState } from "react"
import axios from "axios"

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Link } from "react-router-dom"
import { useAuthContext } from "../context/authContext"


const Header = () => {
    const [IpAddress, setIpAddress] = useState<String>("")
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
                <Container>
                    <Navbar.Brand
                        href="/"
                    ><img
                            alt=""
                            src={process.env.PUBLIC_URL + "/fed-logo.png"}
                            width="70"
                            height="70"
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
                    <Navbar.Brand
                        className="background-color-text ms-auto fs-small"
                    >
                        <Navbar.Collapse className="justify-content-end">
                            {!currentUser &&
                                <Navbar.Text><Link className="background-color-text" to="/Auth/Login">zum Login..</Link></Navbar.Text>
                            }
                            {currentUser &&
                                <Navbar.Text>Hallo {currentUser.username}, <Link to="/Auth/Logout">ausloggen?</Link></Navbar.Text>
                            }
                        </Navbar.Collapse>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header