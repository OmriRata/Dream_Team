import React,{ useEffect, useState,useRef }  from "react";
//import "../style/Team.css"
import LineUp from "../Components/LineUp";
import "../style/Team.css";
import { englandPlayers, playersData } from "../Data/data";
import axios from "axios";
import {NavLink,Navigate} from 'react-router-dom'
import { Button ,Flex} from "@radix-ui/themes";





function Team(){
    const lineupRef = useRef()
    const [players,setPlayers] = useState([]);
    const [league_code,setLeagueCode] = useState();
    const [team_id,setTeamId] = useState();
    const [isPlayers,setIsPlayers] = useState(false);
    const [x,setX] = useState(false)

    const getPlayers= async ()=>{
        try{
            const response = await axios.post("/users/getTeamPlayers", {
                username:localStorage.getItem('username'),
            });
            const data = response.data
            setPlayers(data.players)
            setLeagueCode(data.league_code)
            setTeamId(data.team_id)
            setIsPlayers(true)

        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getPlayers()
    },[])
    return <div className="team">
        {isPlayers?
                <Flex direction={'column'}>
                <NavLink to={'/createTeam'} state={{team_id:team_id,league_code:league_code, players: players,isEditMode:true }}><Button  color="gray" variant="solid" highContrast className='updateBtn'>
                    Edit Lineup</Button>
                    </NavLink>
                <LineUp ref={lineupRef} isCreate={x} players={players} setPlayers={setPlayers}/>
                    
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