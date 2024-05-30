import React ,{useState,useEffect} from "react";
import "../style/LeagueBuilder.css"

function FormInput(props){
    
    return(
        <div className="formInput">
            <label>{props.placeholder+":"}</label>
            <input placeholder={props.placeholder} />
        </div>
    )
}
export default FormInput;