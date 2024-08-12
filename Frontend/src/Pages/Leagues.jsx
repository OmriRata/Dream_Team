import React,{ useEffect, useState }  from "react";
import CustomizedTables from '../Components/Table'
import "../style/Leagues.css"
import {Flex, Button } from "@radix-ui/themes";
import axios from "axios";





function Leagues(){
    const [leagues,setLeagues] = useState([])

    const getLeagues = async()=>{
        try {
            const response = await axios.post("/users/getUserLeagues", {
                username:localStorage.getItem("username")
            });
            const data = response.data
            const leagues = JSON.parse(data.leagues)
            setLeagues(leagues)
            console.log(leagues)
            console.log(data.username)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getLeagues()
    },[])

    return <div className="leagues">
        <Flex direction={'column'} className="container">
            {leagues.map((league,i)=>{
                return <CustomizedTables creator={league.username} key={i} style={{margin:'30px'}} leagueId={league.league_id} leagueCode={league.league_code} leagueName={league.league_name} participants={league.participants} className='league_table'/>
            })
            }
        </Flex>
    </div>
}

export default Leagues;