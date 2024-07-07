import React ,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import "../style/LeagueBuilder.css";
import axios from "axios";
import { json } from "react-router-dom";
import logo from "../assets/download.png"
import FormInput from '../Components/FormInput'
import {Avatar, Flex, Text, Button,Select } from '@radix-ui/themes';
import Leagues from "./Leagues";
import {leaguesData} from '../Data/data'






function LeagueBuilder(){
    const [value, setValue] = useState('');
    const [Leagues,setLeagues] = useState([]);
    const LAEGUES_ID = ['39','140','78','135','61'];


    const fetchData = async(id)=>{
        try{

            // const responses = await Promise.all(LAEGUES.map(id =>{
            //     return fetch(`/api/leagueInfo/${id}`)
            // }))
            // const result = await Promise.all(responses.map(res=>res.json()));
            // setLeagues(result)

            setLeagues(leaguesData)
        }
        catch(err){
            console.log(err)
        } 
        
    }
    
    useEffect(()=>{
        LAEGUES_ID.map((i)=>{
            fetchData(i)
        })
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
                <Flex direction="column" className="flex1">
                    <Text className="selectlabel">
                        Choose Leauge:
                    </Text>
                    <Select.Root className="selectLeague" value={value} onValueChange={setValue}>
                        <Select.Trigger placeholder="chosoe league" className="trigger">{value}</Select.Trigger>
                        <Select.Content className="content">
                            {Leagues && Leagues.map((league,i)=>{
                                return  <Select.Item className="selectItem" key={i} value={league.name}>
                                            <Avatar size="1" src={league.logo} radius="full" fallback="T" color="indigo" />
                                            
                                            {league.name}
                                </Select.Item>
                            })
                            }
                        </Select.Content>
                    </Select.Root>
                </Flex>
                <Button className="league-btn" color="crimson" variant="soft">Create League</Button>
            </form>
            </Flex>
        </div>
    )
}

export default LeagueBuilder;