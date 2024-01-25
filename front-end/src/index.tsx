import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import './colors.css'
import App from './App.tsx'
import { disableReactDevTools } from "@fvilers/disable-react-devtools"

import { PostContextProvider } from './context/postContext.tsx'
import Auth from './pages/Auth.tsx'
import { AuthContextProvider } from './context/authContext.tsx'

if (process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
