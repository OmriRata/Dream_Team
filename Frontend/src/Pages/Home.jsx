import React from "react";
import "../style/Home.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Orange_bg from "../assets/home-banner-background.png"
import Green_bg from "../assets/home-banner-background_green.png"
import Blue_bg from "../assets/home-banner-background_blue.png"
import Purple_bg from "../assets/home-banner-background_purple.png"
import {FiArrowRight} from "react-icons/fi";

function Home(props){
    const navigate = useNavigate()
    const createLeague = ()=>{
        console.log("change page")
        props.c("LeagueBuilder")
        navigate("/createLeague")
    }
    return (
        <>
        <div className="home-container">
            
            <div className="home-banner-container">
                <div className="home-bannerImage-container">
                    <img src={Purple_bg} alt="" />
                </div>
            </div>
            
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
        </>
    )
}

export default Home;