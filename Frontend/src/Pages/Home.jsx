import React from "react";
import "../style/Home.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Home_bg from "../assets/home-banner-background.png"
import Home_bg1 from "../assets/blue-white-gradient-color-.avif"
import {FiArrowRight} from "react-icons/fi";

function Home(){
    const navigate = useNavigate()
    const createLeague = ()=>{
        navigate("/createLeague")
    }
    return (
        <div className="home-container">
            <div className="home-banner-container">
                <div className="home-bannerImage-container">
                    <img src={Home_bg} alt="" />
                </div>
                <div className="home-text-section">
                    <h1 className="primary-heading">
                        Build Your Dream Team !
                    </h1>
                    <p className="primary-text">
                        home-banner-background.png
                        home-banner-background.png
                    </p>
                    <button className="secondary-button" onClick={createLeague}>
                        Join Now <FiArrowRight />
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default Home;