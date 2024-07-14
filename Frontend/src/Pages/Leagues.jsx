import React,{ useEffect, useState }  from "react";
import CustomizedTables from '../Components/Table'
import "../style/Leagues.css"



function Leagues(){
    const getLeagues = async()=>{

    }
    useEffect(()=>{
        getLeagues()
    })
    return <div className="leagues">
        <CustomizedTables className='league_table'/>
    </div>
}

export default Leagues;