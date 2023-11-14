import { createContext, useEffect, useState } from "react"

export const PostContext = createContext()

export const PostContextProvider = ({children}) => {
    const [currentPostId, setCurrentPostId] = useState(null)
    const [currentPostTitle, setCurrentPostTitle] = useState("")

    const replaceSpaces = str => str.replace(/ /g, '-'); // Replaces spaces with dashes

    return <PostContext.Provider value={{ replaceSpaces, currentPostTitle, setCurrentPostTitle, currentPostId, setCurrentPostId}}>
        {children}
    </PostContext.Provider>
}