import React,{ useState }  from "react";
import "../style/ResetPassword.css"



function ResetPassword(props){

    return (
        <div className="login">
                <div className="warpper resetPass">
                    <form method="POST">
                        <div className="login-header">
                            <h1 style={{color:'black'}}>Forgot Password</h1>
                        </div>
                        {/* {message && <p className="message">{message}</p>} */}
                        <div className="input-box">   
                            <input type="email" className="email1" placeholder="email" required/>
                        </div>
                        <button type="submit">reset</button>
                    </form>
                </div>
        </div>
    )
}

export default ResetPassword;