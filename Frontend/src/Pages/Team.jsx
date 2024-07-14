import React,{ useEffect, useState }  from "react";
//import "../style/Team.css"
import LineUp from "../Components/LineUp";
import { englandPlayers, playersData } from "../Data/data";
import axios from "axios";
import {NavLink} from 'react-router-dom'





function Team(){
    const [players,setPlayers] = useState([]);
    const [isPlayers,setIsPlayers] = useState(false);  

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
        getPlayers()
    },[])
    
    return <div style={{margin:'auto',width:'40',height:'100%'}}>
        {isPlayers?
        <LineUp isCreate={false} style={{height:'100% important!;'}} players={players} setPlayers={setPlayers}/>:
        <div>
            You need to create a Team
            <br></br>
            <NavLink  style={{color:'black',backgroundColor:'green'}}  className="navLink" to="/createTeam">Create Team</NavLink>
        </div>
        }
    </div>
}

export default Team;