// register.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import "../style/Register.css";

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [timeoutID, settimeoutID] = useState();



    const setErrorMessage = (message)=>{
        clearTimeout(timeoutID)
        setMessage(message)
        settimeoutID(setTimeout(function(){setMessage("")},5000));
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("/api/register", {
                username,
                email,
                password
            });
            setErrorMessage(response.data.message);
            navigate('/login');
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }

    };

    return (
        <div className="register">
            <div className="wrapper">
                <form onSubmit={handleSubmit} method="POST">
                    <div className="login-header">
                        <h1>Register</h1>
                    </div>
                    {message && <p className="message">{message}</p>}
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <FaEnvelope className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <FaLock className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <FaLock className="icon" />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
