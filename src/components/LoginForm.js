import React, { useState, useContext } from 'react'
import { Redirect, useLocation, useHistory } from "react-router-dom";
import useInputState from '../hooks/useInputState';
import { AuthActionsContext } from '../contexts/AuthContext';

const LoginForm = (props) => {
    const authActions = useContext(AuthActionsContext);
    const [validEmail, setValidEmail] = useState(false);
    const [email, updateEmail, resetEmail] = useInputState('');
    const [password, updatePassword, resetPassword] = useInputState('');
    const [loginMessage, setLoginMessage] = useState(null);
    const [redirectReady, setRedirectReday] = useState(false);
    const { state } = useLocation();
    const history = useHistory();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const results = await authActions.login(email, password);
            if (results) {
                setLoginMessage(`Logged in successfully!`);
                setRedirectReday(true);
            }
        } catch (error) {
            setLoginMessage(`Could not login :( error details: ${error}`);
            setRedirectReday(false);
        }
    }

    const handleOnChangeEmail = (evt) => {
        updateEmail(evt);
        setValidEmail(props.emailValidation(email));
    }

    if(redirectReady){
        // return <Redirect to={state?.from || '/home'} />
        state ? history.push(state.from) : history.push('/home');
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
