import React from "react"
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom"

import Blog from "./pages/Blog.tsx"
import Header from "./components/Header.tsx"
import Footer from "./components/Footer.tsx"
import PostEditor from "./pages/PostEditor.tsx"
import ErrorBoundary from "./pages/ErrorBoundary.tsx"
import NotFound from "./pages/NotFound.tsx"
import About from "./pages/About.tsx"
import Auth from "./pages/Auth.tsx"
import Register from "./components/auth/Register.tsx"
import Login from "./components/auth/Login.tsx"
import Logout from "./components/auth/Logout.tsx"


const Layout = () => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/Auth",
    element: <Auth children={<Outlet></Outlet>}></Auth>,
    children: [
      {
        path: "/Auth/Register",
        element: <Register></Register>
      },
      {
        path: "/Auth/Login",
        element: <Login></Login>
      },
      {
        path: "/Auth/Logout",
        element: <Logout></Logout>
      },
      {
        path: "/Auth/*",
        element: <Navigate replace to="/Auth/Login" />
      }
    ]
  },
  {
    path: "/",
    element: <ErrorBoundary><Layout></Layout></ErrorBoundary>,
    children: [
      {
        path: "/",
        element: <Navigate replace to="/About" />
      },
      {
        path: "/About/",
        element: <About></About>
      },
      {
        path: "/Rezepte/",
        element: <Blog></Blog>
      },
      {
        path: "/Rezepte/:id",
        element: <Blog></Blog>
      },
      {
        path: "/Rezepte/:id/:title",
        element: <Blog></Blog>
      },
      {
        path: "/Rezepte/create",
        element: <PostEditor creatingNewPost={true}></PostEditor>
      },
      {
        path: "/Rezepte/:id/edit",
        element: <PostEditor creatingNewPost={false}></PostEditor>
      },
      {
        path: "/Rezepte/:id/:title/edit",
        element: <PostEditor creatingNewPost={false}></PostEditor>
      },
      {
        path: "*", // 404
        element: <NotFound></NotFound>
      }
    ]
  }
])


function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
