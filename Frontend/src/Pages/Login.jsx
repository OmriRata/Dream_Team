import React from "react";
import "../style/Login.css"
import { FaUser ,FaLock } from "react-icons/fa";



function Login(){
    return (
        <div className="warpper">
            <form action="">
                <div className="login-header">
                    <h1>Login</h1>
                </div>
                <div className="input-box">        
                    <input type="text" placeholder="Username" required/>
                    <FaUser className="icon"/>  
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required/>
                    <FaLock className="icon"/>
                </div>
                <div className="remember-forget">
                    <label><input type="checkbox" />Remember me</label>
                    <a href="#">Forgot password?</a>                
                </div>
                <button type="submit">Login</button>
                <div className="register-link">
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </div>
            </form>
        </div>
    )
}

export default Login;