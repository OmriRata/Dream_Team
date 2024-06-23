import React, { useEffect, useState } from "react";
import {Link, NavLink} from 'react-router-dom'
import "../style/Navbar.css"
import logo from "../assets/download.png"
import { Flex } from '@radix-ui/themes';


function Navbar(props){
    const [menuOpen,setMenuOpen] = useState(false);
    const [user,setUser] = useState(false);
    const isOpen = () => setMenuOpen(!menuOpen);
    
    useEffect(()=>{
        setUser(localStorage.getItem('user'));
    },)

    const logout = ()=>{
        localStorage.removeItem('user')
    }

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
                { user?(
                    <>
                    <li>
                        <NavLink className="navLink" to="/leagues">Team</NavLink>
                    </li>
                    <li>
                        <NavLink className="navLink" to="/team">Leagues</NavLink>
                    </li>
                    <li>
                        <a className='navLink' onClick={()=>logout()} href="login">Logout</a>
                    </li>
                    </>
                ):(<>
                    <li>
                        <NavLink className="navLink" to="/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink className="navLink" to="/register">Register</NavLink>
                    </li>
                    </>)
                }
            </ul>
        </nav>
    )
}

export default Navbar