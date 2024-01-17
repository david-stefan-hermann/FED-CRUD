import React from "react"
import { Navigate } from "react-router-dom"
import { useAuthContext } from "../context/authContext"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { currentUser } = useAuthContext()

    if (!currentUser) {
        return <Navigate replace to="/" />
    }

    return children
}

export default ProtectedRoute