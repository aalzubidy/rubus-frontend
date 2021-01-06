import React, { useState, useContext } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import {AuthContext} from '../contexts/AuthContext';

const HomeLogin = function HomeLogin(props) {
    const [showLoginForm, setShowLoginForm] = useState(true);
    
    const token = useContext(AuthContext);

    const emailValidation = (email) => {
        let validEmail = false;
        email = email ? email.trim().toLowerCase() : email;
        if (email) {
            const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            validEmail = emailRegex.test(email);
        }

        return validEmail
    }

    return (
        <div>
            <button onClick={() => setShowLoginForm(!showLoginForm)}>{showLoginForm ? 'Show Register Form' : 'Show Login Form'}</button>
            {showLoginForm ? <LoginForm emailValidation={emailValidation} /> : <RegisterForm emailValidation={emailValidation} />}
            <h1>{token}</h1>
        </div>
    )
}

export default HomeLogin;
