import { createContext, useState, useContext, FunctionComponent, ReactNode } from 'react';


interface PostContextType {
  replaceSpaces: (str: string) => string | undefined
  currentPostTitle: string
  setCurrentPostTitle: (title: string) => void
  currentPostId: number | null
  setCurrentPostId: (id: number | null) => void
}

export const PostContext = createContext<PostContextType | undefined>(undefined);

interface PostContextProviderProps {
  children: ReactNode
}

export const PostContextProvider: FunctionComponent<PostContextProviderProps> = ({ children }) => {
  const [currentPostId, setCurrentPostId] = useState<number | null>(null)
  const [currentPostTitle, setCurrentPostTitle] = useState<string>("")

  // Replaces spaces with dashes
  const replaceSpaces = (str: string): string | undefined => {
    if (!str) {
      return undefined
    }
    return str.replace(/ /g, '-')
  }

  return (
    <PostContext.Provider value={{ replaceSpaces, currentPostTitle, setCurrentPostTitle, currentPostId, setCurrentPostId }}>
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