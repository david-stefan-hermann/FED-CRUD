import React from "react"
import Button from 'react-bootstrap/Button'

const Register = () => {
    return (
        <>
            <h3 className="my-4">Registrierung</h3>
            <Button onClick={() => console.log("logout")}>Registrieren</Button>
        </>
    )
}

export default Register