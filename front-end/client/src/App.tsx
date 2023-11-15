import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

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
        element: <Blog></Blog>
      },
      {
        path: "/:id",
        element: <Blog></Blog>
      },
      {
        path: "/:id/:title",
        element: <Blog></Blog>
      },
      {
        path: "/create",
        element: <PostEditor creatingNewPost={true}></PostEditor>
      },
      {
        path: "/:id/edit",
        element: <PostEditor creatingNewPost={false}></PostEditor>
      },
      {
        path: "/:id/:title/edit",
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
