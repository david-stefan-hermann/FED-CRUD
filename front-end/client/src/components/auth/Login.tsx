import React from "react"
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"

const Login = () => {
    return (
        <>
            <h3 className="my-4">Login</h3>
            <Button onClick={() => console.log("login")}>Anmelden</Button>
            <p className="my-3">Kein Konto? <Link to="/register">Hier registrieren..</Link></p>
        </>
    )
}

export default Login