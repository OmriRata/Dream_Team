import React,{ useState }  from "react";
import "../style/Login.css"
import { FaUser ,FaLock } from "react-icons/fa";
import { Link,useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";




function Login(props){
    const navigate = useNavigate();

    
    const [message, setMessage] = useState("");
    const [timeoutID, settimeoutID] = useState();

    const setErrorMessage = (message)=>{
        clearTimeout(timeoutID)
        setMessage(message)
        settimeoutID(setTimeout(function(){setMessage("")},5000));
    }


    const login = async (e) => {
        const username = document.getElementsByClassName("username")[0].value;
        const password = document.getElementsByClassName("password")[0].value;
        e.preventDefault();
    
        try {
            const response = await axios.post("/users/login", {
                username,
                password
            });
            const data = response.data
            console.log('successful login')
            props.setToken(data.access_token)
            localStorage.setItem('username',data.username)
            navigate('/');

        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data.error);
        }
    }


    return (
        <div className="login">
                <div className="warpper">
                    <form onSubmit={login} method="POST">
                        <div className="login-header">
                            <h1>Login</h1>
                        </div>
                        {message && <p className="message">{message}</p>}

                        <div className="input-box">        
                            <input type="text" className="username" placeholder="Username" required/>
                            <FaUser className="icon"/>  
                        </div>
                        <div className="input-box">
                            <input type="password" className="password" placeholder="Password" required/>
                            <FaLock className="icon"/>
                        </div>
                        <div className="remember-forget">
                            <label><input type="checkbox" />Remember me</label>
                            <Link to={'/resetPass'}>Forgot password?</Link>                
                        </div>
                        <button type="submit">Login</button>
                        <div className="register-link">
                            <p>Don't have an account? <a href="/register">Register</a></p>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default Login;