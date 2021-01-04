import React, { Component } from 'react'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            validEmail: false
        }
    }

    handleOnChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });

        if (evt.target.name === 'email') {
            this.setState(() => {
                return {
                    validEmail: this.props.emailValidation(evt.target.value)
                }
            })
        }
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        // axois to login
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' value={this.state.email} name='email' onChange={this.handleOnChange} placeholder='Email...' />
                    <br />
                    <input type='password' value={this.state.password} name='password' onChange={this.handleOnChange} placeholder='Password...' />
                    <br />
                    <button disabled={!this.state.validEmail}>Login</button>
                </form>
            </div>
        );
    }
}

export default LoginForm;
