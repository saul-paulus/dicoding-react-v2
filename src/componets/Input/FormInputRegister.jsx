import React, { Component, useState } from "react";
import PropTypes from "prop-types";

function FormInputRegister({register}){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onChangeInputHandler = (e) =>{
        const {name,value} = e.target;
        setFormData((prevStet) => ({
            ...prevStet,
            [name]: value,
        }));
    }

    const onSubmitedLoginHandler = (e) =>{
        e.preventDefault();
        register(formData);
    }
    return (
        <form onSubmit={onSubmitedLoginHandler}>
          <label htmlFor="name">Name (*)</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChangeInputHandler}
            placeholder="Masukan name....."
            required
          />
    
          <label htmlFor="email">Email (*)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChangeInputHandler}
            placeholder="Masukan email....."
            required
          />
    
          <label htmlFor="password">Password (*)</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            autoComplete="current-password"
            onChange={onChangeInputHandler}
            placeholder="Masukan password"
            required
          />
    
          <button type="submit">Register</button>
        </form>
      );
    }
    
    FormInputRegister.propTypes = {
      register: PropTypes.func.isRequired,
    };


export default FormInputRegister;
