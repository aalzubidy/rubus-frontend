import React, { Component } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class HomeLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoginForm: true
        }
    }

    setShowLoginForm = () => {
        this.setState((st) => {
            return {
                showLoginForm: !st.showLoginForm
            }
        })
    }

    emailValidation = (email) => {
        let validEmail = false;
        email = email ? email.trim().toLowerCase() : email;
        if (email) {
            const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            validEmail = emailRegex.test(email);
        }

        return validEmail
    }

    render() {
        return (
            <div>
                <button onClick={this.setShowLoginForm}>{this.state.showLoginForm ? 'Register Form' : 'Login Form'}</button>
                {this.state.showLoginForm ? <LoginForm emailValidation={this.emailValidation} /> : <RegisterForm emailValidation={this.emailValidation}/>}
            </div>
        );
    }
}

export default HomeLogin;
