import React from "react";
import FormInputRegister from "@/componets/Input/FormInputRegister";
import { registerUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

function RegisterPage(){
    const navigate = useNavigate();

    const onRegisterHandler = async(user)=>{
       const {error} = await registerUser(user);
       if(!error){
            navigate("/");
       }
    }

    return (
        <section className="regsiter-page">
            <h1>Isi form untuk mendaftar akun</h1>
            <div className="input-register">
                <FormInputRegister register={onRegisterHandler}/>
            </div>
            <p>Sudah punya akun? <a href="/">Login di sini</a></p>
        </section>
    );
}


export default RegisterPage;