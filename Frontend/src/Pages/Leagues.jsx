import React,{ useEffect, useState }  from "react";
import CustomizedTables from '../Components/Table'
import "../style/Leagues.css"
import {NavLink} from 'react-router-dom'
import {Flex, Button ,Spinner} from "@radix-ui/themes";
import axios from "axios";





function Leagues(){
    const [leagues,setLeagues] = useState([])
    const [flag,setFlag] = useState(false)
    const [isLoading,setIsLoading] = useState(true)

    const getLeagues = async()=>{
        try {
            const response = await axios.post("/users/getUserLeagues", {
                username:localStorage.getItem("username")
            });
            const data = response.data
            const leagues = JSON.parse(data.leagues)
            setLeagues(leagues)
            setFlag(true)
            setIsLoading(false)

            console.log(leagues)
            console.log(data.username)
        }
        catch(error){
            console.log(error)
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getLeagues()
    },[])

    if(isLoading){
        return <Spinner className='start-spinner' size="5" />

    }

    return <div className="leagues">
        {flag?<Flex direction={'column'} className="table">
            {leagues.map((league,i)=>{
                return <CustomizedTables creator={league.username} key={i} style={{margin:'30px'}} leagueId={league.league_id} leagueCode={league.league_code} leagueName={league.league_name} participants={league.participants} className='league_table'/>
            })
            }
        </Flex>:
        <div className="create-league">
        <Flex direction={'column'} className="container">
        <span className="msg">No leagues joined yet!</span>
        <NavLink  style={{color:'black'}}  className="navLink" to="/createLeague">Create League</NavLink>
        </Flex>
    </div>
        }
    </div>
}

export default Leagues;