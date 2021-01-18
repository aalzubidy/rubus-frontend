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
    const baseUrl = 'http://localhost:3030';
    const renewTokenUrl = '/renewTokenByCookie';
    const loginUrl = '/login';
    const logoutUrl = '/logout';
    const registerUrl = '/register';

    // Timeout configurations
    const tokenTimeOutMS = 10000;
    let tokenTimeOutId = null;

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
                const renewTokenResponse = await axios.post(baseUrl + renewTokenUrl, {}, {
                    withCredentials: true
                });

                if (renewTokenResponse && renewTokenResponse.data && renewTokenResponse.data['data']) {
                    await setAccessToken(renewTokenResponse.data['data']['accessToken']);
                    setRenewTokenInProgress(false);
                    return renewTokenResponse.data['data']['accessToken'];
                } else {
                    setRenewTokenInProgress(false);
                    clearToken();
                    return false;
                }
            } catch (error) {
                setRenewTokenInProgress(false);
                clearToken();
                throw error;
            }
        }
    };

    // Call renewToken automatically before token expires
    const scheduleRenewToken = () => {
        tokenTimeOutId = setTimeout(() => {
            renewToken()
        }, tokenTimeOutMS);
    }

    // tokenTimeOutMinutes * 60 * 1000

    // Disconnect all session
    window.addEventListener('storage', (event) => {
        if (event.key === logoutEventName) {
            clearToken();
        }
    });

    // Login and set access token
    const login = async (email, password) => {
        try {
            const loginResponse = await axios.post(baseUrl + loginUrl, {
                email,
                password
            }, {
                withCredentials: true
            }
            );

            console.log(loginResponse);

            if (loginResponse && loginResponse.data && loginResponse.data['data']) {
                setAccessToken(loginResponse.data['data']['accessToken']);
                return (loginResponse.data['data']['accessToken']);
            } else {
                clearToken();
                throw new Error('could not login');
            }
        } catch (error) {
            clearToken();
            throw error;
        }
    };

    // Logout user from backend and front end
    const logout = async () => {
        try {
            await axios.delete(baseUrl + logoutUrl, {
                headers: {
                    token
                }
            });
            clearToken();
            return ('Logged out successful');
        } catch (error) {
            clearToken();
            throw new Error('Could not logout from backend');
        }
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

            if (registerResponse && registerResponse.data && registerResponse.data['data']) {
                return (registerResponse.data['data']['id']);
            } else {
                clearToken();
                throw new Error('could not register user');
            }
        } catch (error) {
            clearToken();
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={token}>
            <AuthActionsContext.Provider value={{ getToken, login, logout, register, getUser, renewToken }}>
                {props.children}
            </AuthActionsContext.Provider>
        </AuthContext.Provider>
    );
}
