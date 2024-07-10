import React,{ useState }  from "react";
//import "../style/Team.css"
import LineUp from "../Components/LineUp";
import { englandPlayers, playersData } from "../Data/data";



function Team(){
    const [players,setPlayers] = useState(englandPlayers)
    
    return <div style={{margin:'auto',width:'40',height:'100%'}}>
        <LineUp style={{height:'100% important!;'}} players={players} setPlayers={setPlayers}/>
    </div>
}

export default Team;