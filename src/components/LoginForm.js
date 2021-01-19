import React, { useState, useContext, useEffect } from 'react'
import { Redirect, useLocation, useHistory } from "react-router-dom";
import useInputState from '../hooks/useInputState';
import { AuthContext, AuthActionsContext } from '../contexts/AuthContext';

const LoginForm = (props) => {
    const authActions = useContext(AuthActionsContext);
    const {token} = useContext(AuthContext);
    const [validEmail, setValidEmail] = useState(false);
    const [email, updateEmail] = useInputState('');
    const [password, updatePassword] = useInputState('');
    const [loginMessage, setLoginMessage] = useState(null);
    const [redirectReady, setRedirectReday] = useState('initialized');
    const { state } = useLocation();
    const history = useHistory();

    useEffect(() => {
        new Promise((res, rej) => {
            if (!token) {
                const results = authActions.renewToken();
                results ? res(results) : rej(false);
            } else {
                res(token);
            }
        }).then((results) => {
            if (results) {
                state ? history.push(state.from) : history.push('/home');
            } else {
                setRedirectReday(false);
            }
        }).catch((error) => {
            setRedirectReday(false);
        });
    }, []);

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
        updateEmail(evt, setValidEmail(props.emailValidation(evt.target.value)));
    }

    if (redirectReady === 'initialized') {
        return <h4>Loading ...</h4>
    }

    if (redirectReady === true) {
        return <Redirect to={state?.from || '/home'} />
        // state ? history.push(state.from) : history.push('/home');
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
