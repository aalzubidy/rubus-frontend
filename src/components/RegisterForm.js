import React, { useState } from 'react'
import useInputState from '../hooks/useInputState';

const RegisterForm = (props) => {
    // Validate email and password
    const [validEmail, setValidEmail] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    // Form inputs
    const [email, updateEmail, resetEmail] = useInputState('');
    const [password, updatePassword, resetPassword] = useInputState('');
    const [fullName, updateFullName, resetFullName] = useInputState('');
    const [organization, updateOrganization, resetOrganization] = useInputState('');

    const handleOnChangeEmail = (evt) => {
        updateEmail(evt);
        setValidEmail(props.emailValidation(email));
    }

    const resetFields = () => {
        resetEmail();
        resetPassword();
        resetFullName();
        resetOrganization();
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // axois to login
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' name='email' value={email} onChange={handleOnChangeEmail} placeholder='Email ...' required />
                <br />
                <input type={showPassword ? 'text' : 'password'} name='password' value={password} onChange={updatePassword} placeholder='Password ...' required />
                <button onClick={() => setShowPassword(!showPassword)}>Show Password</button>
                <br />
                <input type='text' name='fullName' value={fullName} onChange={updateFullName} placeholder='Full name ...' />
                <br />
                <input type='text' name='organization' value={organization} onChange={updateOrganization} placeholder='Organization ...' />
                <br />
                <button onClick={resetFields}>Reset Form</button>
                <button disabled={!validEmail}>Register</button>
            </form>
        </div>
    );
}

export default RegisterForm;
