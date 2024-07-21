import React, { useState, useEffect, useRef } from "react";
import "../style/JoinLeague.css";
import axios from "axios";
import Alert from '@mui/material/Alert';
import { AlertDialog, RadioCards } from '@radix-ui/themes';
import { Flex,  Button } from '@radix-ui/themes';
import { leaguesData } from '../Data/data';

function JoinLeague() {
    const [selectedValue, setSelectedValue] = useState("League code");
    const [leagueId, setLeagueId] = useState('');
    const [username, setUsername] = useState('');
    const [flag,setFlag] = useState(true);
    const [input, setInput] = useState('');
    const [message, setMessage] = useState("");
    const [timeoutID, setTimeoutID] = useState();
    const btnRef = useRef();



    const setErrorMessage = (message) => {
        clearTimeout(timeoutID);
        setMessage(message);
        setTimeoutID(setTimeout(() => {
            setMessage("");
            btnRef.current?.click();
        }, 3000));
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
            console.log(response);
            btnRef.current?.click();

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
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <button ref={btnRef} hidden variant="soft">Size 2</button>
                </AlertDialog.Trigger>
                <AlertDialog.Content size="2" maxWidth="400px">
                    {flag?
                        <Alert severity="error" variant="outlined">create a league</Alert>
                        :<Alert severity="warning" variant="outlined">{message}</Alert>

                    }
                </AlertDialog.Content>
            </AlertDialog.Root>
        </div>
    );
}

export default JoinLeague;