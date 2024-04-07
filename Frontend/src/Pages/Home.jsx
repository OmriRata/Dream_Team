import React from "react";
import "../style/Home.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';


function Home(){
    const navigate = useNavigate()
    const createLeague = ()=>{
        navigate("/createLeague")
    }
    return (
        <div>
            Dream Team
            <br/>
            <Button variant="outline-primary" onClick={createLeague} className="league"> create league</Button>
            <br/>
        </div>
    )
}

export default Home;