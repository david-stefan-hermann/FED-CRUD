import { createContext, useState, FunctionComponent, ReactNode } from 'react';
import React from 'react';

interface PostContextType {
  replaceSpaces: (str: string) => string | undefined;
  currentPostTitle: string;
  setCurrentPostTitle: (title: string) => void;
  currentPostId: number | null;
  setCurrentPostId: (id: number | null) => void;
}

export const PostContext = createContext<PostContextType | undefined>(undefined);

interface PostContextProviderProps {
  children: ReactNode;
}

export const PostContextProvider: FunctionComponent<PostContextProviderProps> = ({ children }) => {
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);
  const [currentPostTitle, setCurrentPostTitle] = useState<string>("");

  // Replaces spaces with dashes
  const replaceSpaces = (str: string): string | undefined => {
    if (!str) {
      return undefined;
    }
    return str.replace(/ /g, '-');
  };

  return (
    <PostContext.Provider value={{ replaceSpaces, currentPostTitle, setCurrentPostTitle, currentPostId, setCurrentPostId }}>
      {children}
    </PostContext.Provider>
  );
};
