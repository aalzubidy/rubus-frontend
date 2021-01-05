import React, { createContext, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthActionsContext = createContext();

export function AuthProvider(props) {
    // Dynamic
    const [token, setToken] = useState(null);
    const [renewTokenInProgress, setRenewTokenInProgress] = useState(false);

    // Static
    const logoutEventName = 'rubus-logout';

    // Urls
    const baseUrl = 'localhost:3030';
    const renewTokenUrl = '/renewTokenByCookie';
    const loginUrl = '/login';
    const logoutUrl = '/logout';
    const registerUrl = '/register';

    // Timeout configurations
    const tokenTimeOutMinutes = 28;
    const tokenTimeOutId = null;

    // Cancel renewing token timeout
    const cancelRenewTokenSchedule = () => {
        if (tokenTimeOutId) {
            window.clearTimeout(tokenTimeOutId);
        }
    };

    // Get in memory token
    const getToken = () => {
        return token;
    };

    // Set in memory token
    const setAccessToken = (accessToken) => {
        setToken(accessToken);
        scheduleRenewToken();
    };

    // Delete token for logout
    const clearToken = () => {
        setToken(null);
        cancelRenewTokenSchedule();
        window.localStorage.setItem(logoutEventName, Date.now());
    };

    //  Renew token by cookie
    const renewToken = async () => {
        if (!renewTokenInProgress) {
            try {
                setRenewTokenInProgress(true);
                let renewTokenResponse = await axios({
                    method: 'post',
                    url: baseUrl + renewTokenUrl,
                    withCredentials: true
                })

                if (renewTokenResponse && renewTokenResponse.response && renewTokenResponse.response['data']) {
                    setAccessToken(renewTokenResponse.response['data']['accessToken']);
                    setRenewTokenInProgress(false);
                } else {
                    setRenewTokenInProgress(false);
                    clearToken();
                }
            } catch (error) {
                setRenewTokenInProgress(false);
                clearToken();
            }
        }
    };

    // Call renewToken automatically before token expires
    const scheduleRenewToken = () => {
        tokenTimeOutId = window.setTimeout(
            renewToken(),
            tokenTimeOutMinutes * 60 * 1000
        );
    };

    // Disconnect all session
    window.addEventListener('storage', (event) => {
        if (event.key === logoutEventName) {
            clearToken();
        }
    });

    // Login and set access token
    const login = async (email, password) => {
        try {
            const loginResponse = await axios({
                method: 'post',
                url: baseUrl + loginUrl,
                data: {
                    email,
                    password
                }
            });

            if (loginResponse && loginResponse.response && loginResponse.response['data']) {
                setAccessToken(loginResponse.response['data']['accessToken']);
                return (loginResponse.response['data']['accessToken']);
            } else {
                clearToken();
                throw { 'error': 'could not login' };
            }
        } catch (error) {
            clearToken();
            throw { 'error': 'could not login' };
        }
    };

    /**
     * @todo
     */
    const logout = async () => {
        clearToken();
    };

    /**
     * @todo
     */
    const getUser = async () => {
        return 'not implemented';
    };

    // Register a new user and return its id
    const register = async (email, password, name = null, organization = null) => {
        try {
            const registerResponse = await axios({
                method: 'post',
                url: baseUrl + registerUrl,
                data: {
                    name,
                    email,
                    password,
                    organization
                }
            });

            if (registerResponse && registerResponse.response && registerResponse.response['id']) {
                return (registerResponse.response['id']);
            } else {
                clearToken();
                throw { 'error': 'could not register user' };
            }
        } catch (error) {
            clearToken();
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={token}>
            <AuthActionsContext.Provider value={getToken, login, logout, register, getUser}>
                {props.children}
            </AuthActionsContext.Provider>
        </AuthContext.Provider>
    );
}
