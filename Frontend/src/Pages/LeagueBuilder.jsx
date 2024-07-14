import React, { useState, useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import "../style/LeagueBuilder.css";
import axios from "axios";
import logo from "../assets/download.png";
import FormInput from '../Components/FormInput';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import {Theme,TextField,Container,Box,Card,AlertDialog,ScrollArea } from '@radix-ui/themes'
import { Avatar, Flex, Text, Button, Select } from '@radix-ui/themes';


import { leaguesData } from '../Data/data';

function LeagueBuilder() {
    const [value, setValue] = useState('');
    const [leagueId, setLeagueId] = useState('');
    const [leagues, setLeagues] = useState([]);
    const [username, setUsername] = useState('');
    const [leagueName,setLeagueName] = useState('');
    const [message, setMessage] = useState("");
    const [timeoutID, settimeoutID] = useState();
    const btnRef = useRef();
    const LEAGUES_ID = ['39', '140', '78', '135', '61'];

    const fetchData = async (id) => {
        try {
            setLeagues(leaguesData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        LEAGUES_ID.map((i) => {
            fetchData(i);
        });
    }, []);

    const handleSelectChange = (e) => {
        const id = leagues.find(league => league.name === e);
        setLeagueId(id.id);
        setValue(e);
    };

    const handleUsernameChange = (e) => {
        setLeagueName(e.target.value);
        console.log(e.target.value)
    };
    const setErrorMessage = (message)=>{
        clearTimeout(timeoutID)
        setMessage(message)
        settimeoutID(setTimeout(function(){setMessage("")},5000));
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/users/createLeague', {
                leagueId,
                leagueName: leagueName,
                username:localStorage.getItem("username")
            });
            setErrorMessage(response.data.message);
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data.error);
            setErrorMessage(error.response.data.error);
            btnRef.current?.click()
        }
    };

    return (
        <div className="league-builder">
            <Flex direction="row" gap="2">
                <Flex className="logo-container" direction="column">
                    <h1>Create Your Fantasy Football League</h1>
                    <img className="logo" src={logo} alt="" />
                </Flex>
                <form className="league-form" onSubmit={handleSubmit}>       
                    <FormInput 
                        placeholder="League Name"
                        value={leagueName}
                        setLeagueName={setLeagueName}
                        onChange={e=>setLeagueName(e.target.value)}
                    />
                    <Flex direction="column" className="flex1">
                        <Text className="selectlabel">
                            Choose League:
                        </Text>
                        <Select.Root className="selectLeague" value={value} onValueChange={handleSelectChange}>
                            <Select.Trigger placeholder="Choose league" className="trigger"></Select.Trigger>
                            <Select.Content className="content">
                                {leagues && leagues.map((league, i) => (
                                    <Select.Item className="selectItem" key={i} value={league.name}>
                                        <Avatar size="1" src={league.logo} radius="full" fallback="T" color="indigo" />
                                        &nbsp;{league.name}&nbsp;
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Root>
                    </Flex>
                    <Button className="league-btn" color="crimson" variant="soft" type="submit">Create League</Button>
                </form>
            </Flex>
            <AlertDialog.Root>
            <AlertDialog.Trigger>
                <button ref ={btnRef} hidden  variant="soft">Size 2</button>
            </AlertDialog.Trigger>
            <AlertDialog.Content size="2" maxWidth="400px">
                <Alert severity="warning" variant="outlined">{message}</Alert>
                <AlertDialog.Cancel>
                    <Button style={{ marginTop: '16px' }}variant="soft" color="gray">
                    Cancel
                    </Button>
                </AlertDialog.Cancel>
            </AlertDialog.Content>
        </AlertDialog.Root>
        </div>
    );
}

export default LeagueBuilder;
