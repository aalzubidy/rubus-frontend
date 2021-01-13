import React, { useState, useContext } from 'react'
import useInputState from '../hooks/useInputState';
import { AuthActionsContext } from '../contexts/AuthContext';

const RegisterForm = (props) => {
    // Validate email and password
    const [validEmail, setValidEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [registerationMessage, setRegisterationMessage] = useState(null);

    const authActions = useContext(AuthActionsContext);

    // Form inputs
    const [email, updateEmail, resetEmail] = useInputState('');
    const [password, updatePassword, resetPassword] = useInputState('');
    const [fullName, updateFullName, resetFullName] = useInputState('');
    const [organization, updateOrganization, resetOrganization] = useInputState('');

    const handleOnChangeEmail = (evt) => {
        updateEmail(evt, setValidEmail(props.emailValidation(evt.target.value)));
    }

    const resetFields = () => {
        resetEmail();
        resetPassword();
        resetFullName();
        resetOrganization();
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const results = await authActions.register(email, password, fullName, organization);
            if (results) {
                setRegisterationMessage(`${email} registered successfully!`);
            }
        } catch (error) {
            setRegisterationMessage(`Could not register user :( error details: ${error}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' name='email' value={email} onChange={handleOnChangeEmail} placeholder='Email ...' required />
                <br />
                <input type={showPassword ? 'text' : 'password'} name='password' value={password} onChange={updatePassword} placeholder='Password ...' required />
                <button type='button' onClick={() => setShowPassword(!showPassword)}>Show Password</button>
                <br />
                <input type='text' name='fullName' value={fullName} onChange={updateFullName} placeholder='Full name ...' />
                <br />
                <input type='text' name='organization' value={organization} onChange={updateOrganization} placeholder='Organization ...' />
                <br />
                <button onClick={resetFields} type='reset'>Reset Form</button>
                <button disabled={!validEmail} type='submit'>Register</button>
                {registerationMessage ? <h1>{registerationMessage}</h1> : ''}
            </form>
        </div>
    );
}

export default RegisterForm;
