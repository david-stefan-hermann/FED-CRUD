import { createContext, useEffect, useState, ReactNode } from "react"

interface AuthContextType {
  currentUser: any | null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({children}) => {
    const [currentUser, setCurrentUser] = useState<string | null>(JSON.parse(localStorage.getItem("user") as string) ?? null)

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
}