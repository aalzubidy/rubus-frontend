import React, { Component, useState } from 'react'
import useInputState from '../hooks/useInputState';

const LoginForm = (props) => {
    const [validEmail, setValidEmail] = useState(false);
    const [email, updateEmail, resetEmail] = useInputState('');
    const [password, updatePassword, resetPassword] = useInputState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // axois to login
        console.log(this.state);
    }

    const handleOnChangeEmail = (evt) => {
        updateEmail(evt);
        setValidEmail(props.emailValidation(email));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' name='email' value={email} onChange={handleOnChangeEmail} placeholder='Email ...' />
                <br />
                <input type='password' name='password' value={password} onChange={updatePassword} placeholder='Password ...' />
                <br />
                <button disabled={!validEmail}>Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
