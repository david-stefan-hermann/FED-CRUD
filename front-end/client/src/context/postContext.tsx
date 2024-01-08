import { createContext, useState, useContext, FunctionComponent, ReactNode } from 'react'
import PostInterface, { newBlankPost } from '../interfaces/postInterface'


interface PostContextType {
  replaceSpaces: (str: string) => string | undefined
  newPost: PostInterface
  setNewPost: React.Dispatch<React.SetStateAction<PostInterface>>
  currentPostTitle: string
  setCurrentPostTitle: (title: string) => void
  currentPostId: string
  setCurrentPostId: (id: string) => void
}

export const PostContext = createContext<PostContextType | undefined>(undefined)

interface PostContextProviderProps {
  children: ReactNode
}

export const PostContextProvider: FunctionComponent<PostContextProviderProps> = ({ children }) => {
  const [ currentPostId, setCurrentPostId ] = useState<string>("")
  const [ currentPostTitle, setCurrentPostTitle ] = useState<string>("")
  const [ newPost, setNewPost ] = useState<PostInterface>(newBlankPost)

  // Replaces spaces with dashes
  const replaceSpaces = (str: string): string | undefined => {
    if (!str) {
      return undefined
    }
    return str.replace(/ /g, '-')
  }

  return (
    <PostContext.Provider value={{ replaceSpaces, newPost, setNewPost, currentPostTitle, setCurrentPostTitle, currentPostId, setCurrentPostId }}>
      {children}
    </PostContext.Provider>
  )
}

// this is a custom hook, which allows to check for postContext before using it, so that there are no conditional hooks
export const usePostContext = () => {
    const context = useContext(PostContext)
  
    if (!context) {
      // Throw an error
      throw new Error('usePostContext must be used within a PostContextProvider')
    }
  
    return context
}