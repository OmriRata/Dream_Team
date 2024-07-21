import React,{ useEffect, useState }  from "react";
import CustomizedTables from '../Components/Table'
import "../style/Leagues.css"
import {Flex, Button } from "@radix-ui/themes";
import axios from "axios";





function Leagues(){
    const getLeagues = async()=>{
        try {
            const response = await axios.post("/users/getUserLeagues", {
                username:localStorage.getItem("username")
            });
            const data = response.data
            console.log(JSON.parse(data.leagues))
            console.log(data.username)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        console.log("Leagues Page")
        getLeagues()
    })
    return <div className="leagues">
        <Flex className="container">
            <CustomizedTables className='league_table'/>
        </Flex>
    </div>
}

export default Leagues;