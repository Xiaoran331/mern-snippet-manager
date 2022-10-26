import React, { useState, useContext } from "react";
import { Link, useHistory } from 'react-router-dom';
import Axios from "axios";
import "./AuthForm.scss";
import UserContext from "../../context/UserContext";
import ErrorMessage from "../misc/ErrorMessage";

function Login () {
    const [formEmail, setFormEmail] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const { getUser } = useContext(UserContext);

    const history = useHistory();

    async function login(e) {
        e.preventDefault();

        const loginData = {
            email: formEmail,
            password: formPassword,
        }

        try {
            await Axios.post("http://localhost:3333/auth/login", loginData);
        }catch(err) {
            if(err.response) {
                if(err.response.data.errorMessage) {
                    setErrorMessage(err.response.data.errorMessage);
                }
            }
            return ;
        }

        //await Axios.post("http://localhost:3333/auth/login", loginData);

        //console.log(document.cookie);
        await getUser();
        history.push("/");
    }

    return <div className="auth-form">
        <h2>Login in</h2>
        {errorMessage && (<ErrorMessage 
            message={errorMessage} 
            clear={() => setErrorMessage(null)}/>
        )}
        <form className="form" onSubmit={login}>
            <label htmlFor="form-email">Email</label>
            <input 
                id="form-email"
                type="email" 
                value={formEmail} 
                onChange={(e) => setFormEmail(e.target.value)}
            />

            <label htmlFor="form-password">Password</label>
            <input 
                id="form-password"
                type="password" 
                value={formPassword} 
                onChange={(e) => setFormPassword(e.target.value)}
            />

            <button 
                className="btn-submit"
                type="submit">Log in</button>
        </form>

        <p>Do not have an account yet?<Link to ="/register">Register here</Link></p>
    </div>;
};

export default Login;

