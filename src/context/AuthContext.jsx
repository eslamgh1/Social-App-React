import React from "react"
import { useEffect } from "react";
import { useState } from "react"
import { createContext } from "react"
import { set } from "zod";


export const authContext = createContext();

export default function AuthContextProvider({ children }) {

    const [token, setToken] = useState(function(){
        return localStorage.getItem("tkn")
    })



    // useEffect(function () {
    //     const tokenFromLocalStorage = localStorage.getItem("tkn");
    //     if (tokenFromLocalStorage) {
    //       setToken(tokenFromLocalStorage)
    //     }
    // }, [])

    function insertUserToken(authToken) {
        setToken(authToken)
        console.log("insertUserToken done:", token)
    }

    function clearUserToken() {
        setToken(null)
    }

    return (
        <authContext.Provider value={{ insertUserToken, token, clearUserToken }}>

            {children}

        </authContext.Provider>)




}

