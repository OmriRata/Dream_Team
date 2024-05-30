import React ,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import "../style/LeagueBuilder.css"
import logo from "../assets/download.png"
import FormInput from '../Components/FormInput'
import { Flex, Text, Button } from '@radix-ui/themes';




function LeagueBuilder(){
    const fatchData = ()=>{
        fetch('/api/teamId/barcelona')
        .then(res => res.json())
        .then(data => console.log(data))
    }
    useEffect(()=>{
    },[])

    return (
        <div className="league-builder">
            <Flex direction="row" gap="2">
                <Flex className="logo-container" direction="column">
                    <h1>Create Your Fantasy Football League</h1>
                    <img className="logo" src={logo} alt="" />
                </Flex>
            <form className="league-form">
                <FormInput placeholder="League Name"/>
                <FormInput placeholder="participants"/>
                <FormInput placeholder="choose league"/>
                <FormInput placeholder="starting budget"/>
                <Button className="league-btn" color="crimson" variant="soft">Submit</Button>
            </form>
            </Flex>
        </div>
    )
}

export default LeagueBuilder;