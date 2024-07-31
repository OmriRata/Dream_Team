import React,{ useEffect, useState,useRef }  from "react";
//import "../style/Team.css"
import LineUp from "../Components/LineUp";
import "../style/Team.css";
import Alert from '@mui/material/Alert';
import { AlertDialog, RadioCards } from '@radix-ui/themes';
import { englandPlayers, playersData } from "../Data/data";
import axios from "axios";
import {NavLink} from 'react-router-dom'
import { Button ,Flex} from "@radix-ui/themes";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




function Team(){
    const lineupRef = useRef()
    const btnRef = useRef()
    const [players,setPlayers] = useState([]);
    const [league_code,setLeagueCode] = useState();
    const [team_id,setTeamId] = useState();
    const [leagueId,setLeagueId] = useState();
    const [isPlayers,setIsPlayers] = useState(false);
    const [flag,setFlag] = useState(false)
    const [leagues,setLeagues] = useState([])
    const [league_name,setLeagueName] = useState('')
    const [open,setOpen] = useState(false)

    const handleOpen = () => setOpen(true);

    const getPlayers= async ()=>{
        try{
            const response = await axios.post("/users/getTeamPlayers", {
                username:localStorage.getItem('username'),
            });
            const data = response.data
            setLeagues(data)
            console.log(data)
            setIsPlayers(true)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getPlayers()
    },[])
    

    const handleChange = (event) => {
        const _league_code = event.target.value
        setLeagueName(_league_code);
        setLeagueCode(_league_code)
        console.log(leagues)
        const team = leagues.filter(team=> team.league_code == _league_code)[0];
        if (!(team.players)){
            btnRef.current?.click();
            return
        }
        setTeamId(team.team_id)
        setPlayers(team.players)
        setLeagueId(team.league_id)
        console.log(localStorage.getItem('username'))
        setFlag(true)
    };

    return <div className="team">
        {isPlayers?
                <Flex direction={'column'}>
                    <FormControl style={{marginTop:'10px'}} fullWidth>
                        <InputLabel id="demo-simple-select-label">League Name</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={league_name}
                        label="League Name"
                        onChange={handleChange}
                        >
                        {leagues.map((league)=>{
                                return <MenuItem id={league.league_code} value={league.league_code}>{league.league_name}</MenuItem>

                        })}
                        </Select>
                    </FormControl>
                {!league_code?
                    <Button disabled  color="gray" variant="solid" highContrast className='updateBtn'>
                    Edit Lineup</Button>
                    :<NavLink to={'/createTeam'} state={{leagueId:leagueId, team_id:team_id,league_code:league_code, players: players,isEditMode:true }}><Button  color="gray" variant="solid" highContrast className='updateBtn'>
                    Edit Lineup</Button>
                    </NavLink>}
                <LineUp ref={lineupRef} isCreate={false} players={players?players:[]} setPlayers={setPlayers}/>
                    
            </Flex>
            :
            <div>
                You need to create a Team
                <br></br>
                <NavLink  style={{color:'black',backgroundColor:'green'}}  className="navLink" to="/createTeam">Create Team</NavLink>
            </div>
        }
        <AlertDialog.Root open={open}>
                <AlertDialog.Trigger>
                    <button ref={btnRef} onClick={handleOpen} hidden variant="soft">Size 2</button>
                </AlertDialog.Trigger>
                <AlertDialog.Content style={{bottom:'0px'}} size="2" maxWidth="50%">
                <Alert
                severity="error"
                action={
                    <NavLink to={'/createTeam'} state={{leagueId:leagueId,league_code:league_code }}><Button  color="gray" variant="solid" highContrast className='updateBtn'>
                        Create Team</Button>
                    </NavLink>
                }
                >
                    <h3>Reminder: Complete Your Team!</h3>
                    Your team isn't complete yet. Please finish building your roster to get started!
                </Alert>
                </AlertDialog.Content>
            </AlertDialog.Root>
    </div>
}

export default Team;