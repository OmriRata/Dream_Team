import React, { useEffect, useState } from "react";
import {Link, NavLink, Navigate} from 'react-router-dom'
import "../style/Navbar.css"
import logo from "../assets/download.png"
import { Flex } from '@radix-ui/themes';


function Navbar(props){
    const [menuOpen,setMenuOpen] = useState(false);
    const [isConnected,setIsConnected] = useState(false);
    const isOpen = () => setMenuOpen(!menuOpen);
    
    useEffect(()=>{
        if(props.token !== undefined && props.token && props.token !== ''){
            setIsConnected(true)
        }
    },[props.token])

    const logout = ()=>{
        props.removeToken()
        localStorage.removeItem("username")
        setIsConnected(false)
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
                { isConnected?(
                    <>
                    <li>
                        <NavLink className="navLink" to="/team">Team</NavLink>
                    </li>
                    <li>
                        <NavLink className="navLink" to="/leagues">Leagues</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={()=>logout()}className="navLink" to="/login">Logout</NavLink>
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