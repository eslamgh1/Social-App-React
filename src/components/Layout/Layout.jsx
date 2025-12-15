import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"


<Footer></Footer>
export default function Layout() {

  return (
    <>
      <Navbar />

      <div className="p-30 min-h-screen bg-gradient-to-b from-blue-400">
        <Outlet />
      </div>

      <Footer />
    </>
  )
}

