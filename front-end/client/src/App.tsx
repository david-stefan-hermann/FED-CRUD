import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";

import Blog from "./pages/Blog.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import PostEditor from "./pages/PostEditor.tsx";

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
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Navigate replace to="/Rezepte" />
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
      }
    ]
  }
])


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
