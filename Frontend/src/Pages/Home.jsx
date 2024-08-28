import React from "react";
import "../style/Home.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import CountdownTimer from '../Components/CountdownTimer';
import GameFlow from '../Components/GameFlow';
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
    const joinLeague = ()=>{
        navigate("/joinLeague")

    }
    
    return (
        <div className="a">
        {/* <CountdownTimer targetDate={"2024-09-02T10:00:00"}/> */}

        <div className="home-container">
            
            <div className="home-banner-container">
                <div className="home-bannerImage-container">
                    <img src={Purple_bg} alt="" />
                </div>
            </div>
            
        </div>
        <Flex className="home" direction="row" >
        <div className="home-text-section">
                        <h1 className="primary-heading">
                            Build Your Dream Team !
                        </h1>
                        <button className="secondary-button" onClick={createLeague}>
                        Create League <FiArrowRight />
                        </button>
                        <button className="secondary-button" onClick={joinLeague}>
                        Join a League <FiArrowRight />
                    </button>
                        
        </div>
                <img className="playerImg" src={player} alt="" />
        <GameFlow/>
        </Flex>

        </div>
    )
}

export default Home;