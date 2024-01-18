import React, { useState } from "react"
import { Alert, Form, InputGroup } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/authContext"
import { Eye, EyeSlash } from "react-bootstrap-icons"

const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuthContext()

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
            await login(inputs)
            
            navigate("/")
        } catch(err: Error | any) {
            setError(err.response.data)
        }
    }

    const [showPassword, setShowPassword] = useState(false)
    
    return (
        <>
            <h3 className="my-4">Login</h3>
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
                type={showPassword ? "text" : "password"}
                />
                <InputGroup.Text onClick={ () => setShowPassword(!showPassword)} >
                { showPassword ? <Eye/> : <EyeSlash/> }
                </InputGroup.Text>
            </InputGroup>
            {err && 
            <Alert key="warning" variant="warning">{err}</Alert>}
            <Button onClick={handleSubmit}>Anmelden</Button>
            <p className="my-3">Kein Konto? <Link to="/Auth/Register">Hier registrieren..</Link></p>    
        </>
    )
}

export default Login