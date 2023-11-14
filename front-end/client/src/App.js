import { createBrowserRouter, RouterProvider, Route, Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import PostEditor from "./pages/PostEditor";

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
