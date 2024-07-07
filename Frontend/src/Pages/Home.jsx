import React from "react";
import "../style/Home.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Orange_bg from "../assets/home-banner-background.png"
import Green_bg from "../assets/home-banner-background_green.png"
import Blue_bg from "../assets/home-banner-background_blue.png"
import Purple_bg from "../assets/home-banner-background_purple.png"
import player from '../assets/soccer-player-team-sport-football-player-jersey-lucas.png'
import player2 from '../assets/istockphoto-939168954-612x612-removebg-preview.png'
import {FiArrowRight} from "react-icons/fi";
import { Flex } from '@radix-ui/themes';

function Home(props){
    const navigate = useNavigate()
    const createLeague = ()=>{
        props.c("LeagueBuilder")
        navigate("/createLeague")
    }
    const createTeam = ()=>{
        console.log("change page")
        props.c("LeagueBuilder")
        navigate("/createTeam")
    }
    const info = ()=>{
        console.log("change page")
        props.c("LeagueBuilder")
        navigate("/ExplanationPage")
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
        <Flex direction="row" gap="2">

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
                        </button><button className="secondary-button" onClick={createTeam}>
                            Create Your Team <FiArrowRight />
                        </button>
                        <button className="secondary-button" onClick={info}>
                        information <FiArrowRight />
                        </button>
                </div>
                <>
                <img src={player} alt="" />
                </>
                </Flex>

        </>
    )
}

export default Home;