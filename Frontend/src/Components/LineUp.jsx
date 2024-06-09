import React, { useEffect } from 'react'
import '../style/LineUp.css'
import field from '../assets/soccer_field2.jpg'
import {Avatar, Button} from '@radix-ui/themes'
function LineUp({players}) {
    
    return (
        <div className='line-up'>
            <h1 className='teamH1'>My Team:</h1>
            <div className="line">
                {players.map((img,i)=>{
                    return  <Avatar key={i} size="6" src={img} radius="full" fallback="T" color="indigo" />
                })
                }
            </div>
            <Button className='applyBtn'> Apply </Button>
            
        </div>
    )
}

export default LineUp