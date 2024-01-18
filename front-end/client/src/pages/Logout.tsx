import React, { useState } from "react"
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/authContext"
import { Alert } from "react-bootstrap"


const Logout = () => {
    const navigate = useNavigate()
    const { logout } = useAuthContext()

    const [err, setError] = useState(null)


    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            logout()
            navigate("/Rezepte/")
        } catch(err: Error | any) {
            setError(err.response.data)
        }
    }

    return (
        <>
            <h3 className="my-4">Logout</h3>
            <Button onClick={handleSubmit}>Abmelden</Button>
            {err && 
            <Alert key="warning" variant="warning">{err}</Alert>}
        </>
    )
}

export default Logout