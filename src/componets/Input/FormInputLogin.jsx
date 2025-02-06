import React, { useState } from "react";
import PropTypes from "prop-types";


function FormInputLogin({authLogin}){
    const [formData, setFormData] = useState({
        email:"",
        password:""
    });

    const onChangeInputHandler = (e) =>{
        const {name,value} = e.target;
        setFormData((prevState) =>({
            ...prevState,
            [name]: value
        }));
    }

    const onSubmitedLoginHandler = (e) =>{
        e.preventDefault();
        authLogin(formData);
    }

    return (
        <form onSubmit={onSubmitedLoginHandler} >
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={onChangeInputHandler}
                placeholder="Masukan email terdaftar....."
                required
            />
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                id="password" 
                name="password"
                value={formData.password}
                onChange={onChangeInputHandler}
                placeholder="Masukan password......"
                required
            />
            <button type="submitsau">Login</button>
        </form>
    );
}

FormInputLogin.propTypes = {
    authLogin: PropTypes.func.isRequired
}

export default FormInputLogin;