import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, clearUserToken } = useContext(authContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("tkn");
    clearUserToken();
    navigate("/login");
  }

  return (
    <nav className="bg-white fixed w-full z-30 top-0 start-0 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-blue-600 tracking-tight">
            SocialApp
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-xl bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent items-center">
            
            {token ? (
              <>
                <li>
                  <Link to="/" className="nav-link-style text-blue-600 font-semibold">Home</Link>
                </li>
                <li>
                  <Link to="/profile" className="nav-link-style text-gray-600 hover:text-blue-600">Profile</Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="mt-2 md:mt-0 px-5 py-2 bg-red-50 text-red-600 rounded-full font-semibold hover:bg-red-100 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="nav-link-style text-gray-600 hover:text-blue-600">Login</Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="mt-2 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-shadow shadow-md"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}