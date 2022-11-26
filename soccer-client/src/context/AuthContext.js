import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("user")) || null
    )

    const login = async (inputs) => {
        const res = await makeRequest.post("/login", inputs, {
            withCredentials: true
        })

        setCurrentUser(res.data.details)
    }

    const logout = ()=>{
        setCurrentUser(null)
        console.log("fds")
    }

 
    useEffect(() => {
        sessionStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser])


    return (
        <AuthContext.Provider
            value={{
                currentUser,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};