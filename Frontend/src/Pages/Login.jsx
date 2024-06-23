import React,{ useState }  from "react";
import "../style/Login.css"
import { FaUser ,FaLock } from "react-icons/fa";



function Login(){
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
        
        const response = await fetch("http://localhost:5000/login",{
            method:'POST',
            body:JSON.stringify({'username':username,'password':password}),
            headers: { 
                "Content-type": "application/json; charset=UTF-8"
            } 
        })
        .then(response => response.json()) 

        // Displaying results to console 
        .then(json => {
            if(json.error){
                setErrorMessage(json.error)
                return
            }
            console.log('successful login')
            window.location.href = '/';
        })
        .catch (error=> {
            console.log(error)
        })
        


    
    
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
                    <a href="#">Forgot password?</a>                
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