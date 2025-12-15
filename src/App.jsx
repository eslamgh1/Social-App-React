import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Home from "./components/Home/Home"



const router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { path: 'home', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <div><h1>Not found</h1></div> }
    
    ]
  }
])


export default function App() {

  return (
    <RouterProvider router={router}/>
    

  )
}

