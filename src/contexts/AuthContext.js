import React, { createContext, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext();
export const AuthActionsContext = createContext();

const tokenTimeOutM = 28;
const refreshTokenTimeOutM = 1440;

export function AuthProvider(props) {
    const [token, setToken] = useState(null);
    
    const updateToken = (accessToken) => {
        setToken(accessToken);
    };
    
    return (
        <AuthContext.Provider value={token}>
            <AuthActionsContext.Provider value={updateToken}>
                {props.children}
            </AuthActionsContext.Provider>
        </AuthContext.Provider>
    );
}
