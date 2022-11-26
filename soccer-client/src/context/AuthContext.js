import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("user")) || null
    )

    const login = async (inputs) => {
        const res = await axios.post("http://localhost:8800/api/login", inputs, {
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