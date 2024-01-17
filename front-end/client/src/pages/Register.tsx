import React, { useState } from "react"
import { Alert, Form, InputGroup } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom"
import axios from "axios"


const Register = () => {
    const navigate = useNavigate()

    const [err, setError] = useState(null)
    const [inputs, setInputs] = useState({
        username:"",
        password:"",
    })

    const handleChange = (e: { target: { name: any; value: any } }) => {
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
        setError(null)
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            await axios.post("/auth/register", inputs)
            
            navigate("/Auth/Login")
        } catch(err: Error | any) {
            setError(err.message)
        }
    }
    
    return (
        <>
            <h3 className="my-4">Registrieren</h3>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Benutzer</InputGroup.Text>
                <Form.Control
                required
                placeholder="..."
                name="username"
                onChange={handleChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Passwort</InputGroup.Text>
                <Form.Control
                required
                placeholder="..."
                name="password"
                onChange={handleChange}
                />
            </InputGroup>
            {err && 
            <Alert key="warning" variant="warning">{err}</Alert>}
            <Button onClick={handleSubmit}>registrieren</Button>
        </>
    )
}

export default Register