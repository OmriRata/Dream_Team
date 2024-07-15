import React,{ useEffect, useState,useRef }  from "react";
//import "../style/Team.css"
import LineUp from "../Components/LineUp";
import "../style/Team.css";
import { englandPlayers, playersData } from "../Data/data";
import axios from "axios";
import {NavLink,Navigate} from 'react-router-dom'
import { Button } from "@radix-ui/themes";





function Team(){
    const lineupRef = useRef()
    const [players,setPlayers] = useState([]);
    const [isPlayers,setIsPlayers] = useState(false);
    const [x,setX] = useState(false)

    const getPlayers= async ()=>{
        try{
            const response = await axios.post("/users/getTeamPlayers", {
                username:localStorage.getItem('username'),
            });
            const data = response.data
            setPlayers(data.players)
            setIsPlayers(true)

        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        console.log(lineupRef.current?.league_code)
        getPlayers()
    },[])
    return <div className="team">
        {isPlayers?
            // <div className="updateTeam">  
                <div class="inner">
                <NavLink to={'/createTeam'} state={{ players: players,isEditMode:true }}><Button className='updateBtn'>
                    edit lineup</Button>
                    </NavLink>
                <LineUp ref={lineupRef} isCreate={x} players={players} setPlayers={setPlayers}/>
                    
            </div>
// /            </div>

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