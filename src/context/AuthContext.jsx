import React from "react"
import { useEffect } from "react";
import { useState } from "react"
import { createContext } from "react"
import { set } from "zod";
import { jwtDecode } from "jwt-decode";


export const authContext = createContext();

export default function AuthContextProvider({ children }) {
    // lazy loading solution instead of useEffect
    const [token, setToken] = useState(function () {
        return localStorage.getItem("tkn")
    })
    const [userId, setUserId] = useState(null)


    useEffect(function () {
        if (token) {
            const userId = jwtDecode(token).user
            setUserId(userId)
            console.log(userId)
        }
    }, [token])


    // handle token user refresh >> I used lazy loading solution instead of useEffect
    // useEffect(function () {
    //     const tokenFromLocalStorage = localStorage.getItem("tkn");
    //     if (tokenFromLocalStorage) {
    //       setToken(tokenFromLocalStorage)
    //     }
    // }, [])

    function insertUserToken(authToken) {
        setToken(authToken)
    }

    function clearUserToken() {
        setToken(null)
    }




    return (
        <authContext.Provider value={{ insertUserToken, token, clearUserToken ,userId }}>

            {children}

        </authContext.Provider>)




}

