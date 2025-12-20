import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Home from "./components/Home/Home"
import AuthContextProvider from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Profile from "./components/Profile/Profile"
import AuthUser from "./components/ProtectedRoute/AuthUser"



const router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [

      { path: '', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute>  },
      { path: 'login', element: <AuthUser><Login /></AuthUser> },
      { path: 'register', element: <Register /> },
      { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: '*', element: <div><h1>Not found</h1></div> }
    
    ]
  }
])


export default function App() {

  return (
    <AuthContextProvider>
    <RouterProvider router={router}/>
    </AuthContextProvider>
    

  )
}

