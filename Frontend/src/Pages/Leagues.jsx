import React,{ useEffect, useState }  from "react";
import CustomizedTables from '../Components/Table'
import "../style/Leagues.css"
import {Flex, Button } from "@radix-ui/themes";




function Leagues(){
    const getLeagues = async()=>{

    }
    useEffect(()=>{
        getLeagues()
    })
    return <div className="leagues">
        <Flex className="container">
            <CustomizedTables className='league_table'/>
        </Flex>
    </div>
}

export default Leagues;