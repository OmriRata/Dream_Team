import React from "react";
import "../style/Home.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"


function Home(){
    const navigate = useNavigate()
    const createLeague = ()=>{
        navigate("/createLeague")
    }
    return (
        <div>
            Dream Team
            <br/>
            <button onClick={createLeague} className="league"> create league</button>
            <br/>
        </div>
    )
}

export default Home;