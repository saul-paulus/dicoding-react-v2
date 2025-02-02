import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import FormInputLogin from "@/componets/Input/FormInputLogin";
import { authLogin } from "../utils/apiAuth";
import PropTypes from "prop-types";

function LoginPage({onLoginSuccess})
{

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const onLoginHandler = async ({email,password}) =>{
        setIsLoading(true);
        setErrorMessage("");

        try{
            const {error, data} = await authLogin({ email, password })

            if(!error){
                onLoginSuccess({accessToken: data.accessToken});
                navigate("/");
            }else{
                setErrorMessage(data?.message || "Gagal Login");
            }
        }catch(error){
            setErrorMessage("Error saat login");
        }finally{
            setIsLoading(false);
        }
   
    }

    return (
        <section className="login-page">
            <h2>Yuk, login untuk menggunakan aplikasi.</h2>
            <div className="input-login">
                {errorMessage && <p>{errorMessage}</p>}
                <FormInputLogin 
                    authLogin={onLoginHandler}
                    isLoading={isLoading}
                />
            </div>
            <p>Belum punya akun? <Link to="/register">Daftar di sini</Link></p>
        </section>
    );
}

LoginPage.propTypes = {
    onLoginSuccess: PropTypes.func.isRequired
}


export default LoginPage;