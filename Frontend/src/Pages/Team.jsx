import React,{ useEffect, useState,useRef }  from "react";
//import "../style/Team.css"
import LineUp from "../Components/LineUp";
import "../style/Team.css";
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
    const [players,setPlayers] = useState([]);
    const [league_code,setLeagueCode] = useState();
    const [team_id,setTeamId] = useState();
    const [leagueId,setLeagueId] = useState();
    const [isPlayers,setIsPlayers] = useState(false);
    const [flag,setFlag] = useState(false)
    const [teams,setTeams] = useState([])
    const [league_name,setLeagueName] = useState('')

    const getPlayers= async ()=>{
        try{
            const response = await axios.post("/users/getTeamPlayers", {
                username:localStorage.getItem('username'),
            });
            const data = response.data
            setTeams(data)
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
        const team = teams.filter(team=> team.league_code == _league_code)[0];
        setTeamId(team.team_id)
        setPlayers(team.players)
        setLeagueId(team.league_id)
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
                        {teams.map((team)=>{
                                return <MenuItem id={team.league_code} value={team.league_code}>{team.league_name}</MenuItem>

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
    </div>
}

export default Team;