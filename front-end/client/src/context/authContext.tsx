import axios from "axios"
import React, { createContext, useEffect, useState, ReactNode, useContext } from "react"
import LoginInputs from "../interfaces/loginInputsInterface"

interface AuthContextType {
    currentUser: any | null
    login: (inputs: LoginInputs) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthContextProviderProps {
    children: ReactNode
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({children}) => {
        const [currentUser, setCurrentUser] = useState<string | null>(JSON.parse(localStorage.getItem("user") as string) ?? null)

        const login = async(inputs: LoginInputs) => {
                const res = await axios.post("/auth/login", inputs)
                setCurrentUser(res.data)
        }
        
        const logout = async() => {
                await axios.post("/auth/logout")
                setCurrentUser(null)
        }

        useEffect(() => {
                localStorage.setItem("user", JSON.stringify(currentUser))
        }, [currentUser])

    return <AuthContext.Provider value={{currentUser, login, logout}}>
        {children}
    </AuthContext.Provider>
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
      // Throw an error
      throw new Error('useAuthContext must be used within a AuthContextProvider')
    }

    return context
}
