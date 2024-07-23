import React, { useState, useEffect, useRef } from "react";
import "../style/JoinLeague.css";
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { AlertDialog, RadioCards } from '@radix-ui/themes';
import { Flex,  Button } from '@radix-ui/themes';
import { leaguesData } from '../Data/data';
import {NavLink, useNavigate } from "react-router-dom";


function JoinLeague() {
    const navigate = useNavigate() 
    const [selectedValue, setSelectedValue] = useState("League code");
    const [leagueId, setLeagueId] = useState('');
    const [leagueName, setLeagueName] = useState('');
    const [leagueCode, setLeagueCode] = useState('');
    const [flag,setFlag] = useState(true);
    const [input, setInput] = useState('');
    const [message, setMessage] = useState("");
    const btnRef = useRef();
    const btnRef2 = useRef();
    const [open,setOpen] = useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const setErrorMessage = (message) => {
        // clearTimeout(timeoutID);
        setMessage(message);
        // setTimeoutID(setTimeout(() => {
        //     setMessage("");
        //     btnRef.current?.click();
        // }, 3000));
    };
    const handeChanged = (value)=>{
        setSelectedValue(value)
        console.log(selectedValue)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const key = selectedValue=='League code' ? 'league_code': 'league_name';

        try {
            const response = await axios.post('/users/joinLeague', {
                username: localStorage.getItem("username"),
                input,
                key
            });
            const data = response.data;
            setLeagueId(data.league_id)
            setLeagueCode(data.league_code)
            setLeagueName(data.league_name)
            btnRef2.current?.click();

        } catch (error) {
            setFlag(false)
            console.error(error.response.data.error);
            setErrorMessage(error.response.data.error);
            btnRef.current?.click();
        }
    };

    return (
        <div className="join_league">
            <Flex direction={"row"} gap="2">
                <form className="join_league_form" onSubmit={handleSubmit}>
                <RadioCards.Root  value={selectedValue} onValueChange={handeChanged} className="radio" size="1">
                    <RadioCards.Item value="League code">I have an invitation code</RadioCards.Item>
                    <RadioCards.Item value="League name">Search for a league name</RadioCards.Item>
                </RadioCards.Root>
                <div className="form">
                    <label className='leagueLabel'>{selectedValue+' :'}</label>
                    <input onChange={e=>setInput(e.target.value)} placeholder={selectedValue} />
                </div>      
                    <Button className="join-btn" color="blue" variant="soft" type="submit">Join</Button>
                </form>
            </Flex>
            <AlertDialog.Root open={open}>
                <AlertDialog.Trigger>
                    <button onClick={handleOpen} ref={btnRef} hidden variant="soft">Size 2</button>
                </AlertDialog.Trigger>
                <AlertDialog.Content size="2" maxWidth="400px">
                    <Alert severity="warning" onClose={handleClose}>
                        {message}
                    </Alert>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <button ref={btnRef2} hidden variant="soft">Size 2</button>
                </AlertDialog.Trigger>
                <AlertDialog.Content style={{bottom:'0px'}} size="2" maxWidth="40%">
                <Alert
                severity="success"
                action={
                    <NavLink to={'/createTeam'} state={{leagueId:leagueId,league_code:leagueCode }}><Button  color="gray" variant="solid" highContrast className='updateBtn'>
                    Create Team</Button>
                    </NavLink>
                }
                >
                    You have successfully joined the League
                </Alert>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </div>
    );
}

export default JoinLeague;