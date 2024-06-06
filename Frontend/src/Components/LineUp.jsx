import React from 'react'
import '../style/LineUp.css'
import field from '../assets/soccer_field2.jpg'
import { Button} from '@radix-ui/themes'
function LineUp() {
    return (
        <div className='line-up'>
            <h1 className='teamH1'>My Team:</h1>
            <img className='fieldImg' src={field} alt="" />
            <Button className='applyBtn'> Apply </Button>
        </div>
    )
}

export default LineUp