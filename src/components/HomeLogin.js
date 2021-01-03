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

    render() {
        return (
            <div>
                {this.state.showLoginForm ? <LoginForm /> : <RegisterForm />}
                <button onClick={this.setShowLoginForm}>{this.state.showLoginForm ? 'Register Form' : 'Login Form'}</button>
            </div>
        );
    }
}

export default HomeLogin;