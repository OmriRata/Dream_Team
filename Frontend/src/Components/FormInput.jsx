import React ,{useState,useEffect} from "react";
import "../style/LeagueBuilder.css"

function FormInput(props){
    
    return(
        <div className="formInput">
            <label>{props.placeholder+":"}</label>
            <input onChange={e=>props.setLeagueName(e.target.value)} placeholder={props.placeholder} />
        </div>
    )
}
export default FormInput;