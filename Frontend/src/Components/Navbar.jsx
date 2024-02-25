import React from "react";
import {Link, NavLink} from 'react-router-dom'
import "../style/Navbar.css"

function Navbar(){
    return (
        <nav>
            <Link className="title" to="/">Dream Team</Link>

            <ul>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/register">Register</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar