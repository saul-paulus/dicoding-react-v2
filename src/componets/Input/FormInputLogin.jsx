import React from "react";
import PropTypes from "prop-types";

class FormInputLogin extends React.Component
{
    state = {
        email:"",
        password:""
    }


    onChangeInputHandler = (e) =>{
        const {name, value} = e.target;
        this.setState({ [name]: value });
    }

    onSubmitedLoginHandler = (e) =>{
        e.preventDefault();
        this.props.authLogin(this.state);
    }

    render(){
        return (
            <form onSubmit={this.onSubmitedLoginHandler} >
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeInputHandler}
                    placeholder="Masukan email terdaftar....."
                    required
                />
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangeInputHandler}
                    placeholder="Masukan password......"
                    required
                />
                <button type="submitsau">Login</button>
            </form>
        );
    }
}


FormInputLogin.protoTypes = {
    authLogin: PropTypes.func.isRequired
}


export default FormInputLogin;