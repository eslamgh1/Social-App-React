import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Home from "./components/Home/Home"
import AuthContextProvider from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Profile from "./components/Profile/Profile"
import AuthUser from "./components/ProtectedRoute/AuthUser"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import PostDetails from "./components/PostDetails/PostDetails"



const router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [

      { path: '', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'login', element: <AuthUser><Login /></AuthUser> },
      { path: 'register', element: <Register /> },
      { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: 'postdetails/:id', element: <ProtectedRoute> <PostDetails /></ProtectedRoute> },
      { path: '*', element: <div><h1>Not found</h1></div> }


    ]
  }
])

// Class = Constructor function for QueryClient - manages caching and data fetching for React Query
// It creates a client instance that will handle all React Query operations throughout the app
// This client will be used to provide React Query functionality to the entire application
// The client is configured with default options for caching behavior and error handling
// These options include stale time, cache time, and error retry behavior
const client = new QueryClient();





export default function App() {
  
  return (

    <AuthContextProvider>

      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>

    </AuthContextProvider>

  );
}

