import React, { useState } from "react";
import {Link, NavLink} from 'react-router-dom'
import "../style/Navbar.css"
import logo from "../assets/download.png"
import { Flex } from '@radix-ui/themes';


function Navbar(props){
    const [menuOpen,setMenuOpen] = useState(false);
    const isOpen = () => setMenuOpen(!menuOpen);
    return (
        <nav>
                <Link className="title" to="/">
                    <Flex className="flex-container" direction="row">
                    <img src={logo} alt="" />
                    <label>Dream Team</label>
                    </Flex>
                </Link>
            <div className="menu" onClick={isOpen}>
                <span></span> 
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen?"open":""}>
                <li>
                    <h1 color="white" >{props.page}</h1>
                </li>
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