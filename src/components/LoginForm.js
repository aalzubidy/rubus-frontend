import React, { useState, useContext } from 'react'
import useInputState from '../hooks/useInputState';
import { AuthActionsContext } from '../contexts/AuthContext';

const LoginForm = (props) => {
    const authActions = useContext(AuthActionsContext);
    const [validEmail, setValidEmail] = useState(false);
    const [email, updateEmail, resetEmail] = useInputState('');
    const [password, updatePassword, resetPassword] = useInputState('');
    const [loginMessage, setLoginMessage] = useState(null);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const results = await authActions.login(email, password);
            if (results) {
                setLoginMessage(`Token: ${results} logged in successfully!`);
            }
        } catch (error) {
            setLoginMessage(`Could not login :( error details: ${error}`);
        }
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
                {loginMessage ? <h1>{loginMessage}</h1> : ''}
            </form>
        </div>
    );
}

export default LoginForm;
