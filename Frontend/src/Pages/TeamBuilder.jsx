import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Flex,Separator } from '@radix-ui/themes';
import "../style/TeamBuilder.css"
import soccer_field from '../assets/soccer_field2.jpg'
import PlayerSelection from '../Components/PlayerSelection';
import LineUp from '../Components/LineUp';

function TeamBuilder(props) {
    const location = useLocation();
    const isEditMode = location.state?.isEditMode;
    console.log(isEditMode)

    const [players,setPlayers] = useState(location.state?.players?location.state?.players:[])
    const [amount,setAmount] = useState('100M')
    

return (
        <Flex className="team-builder" direction="column" gap="2">
            <div className="playerSelect" >
                <PlayerSelection setAmount={setAmount} setPlayers={setPlayers} players={players} />
            </div>
            <div className='Line-up'>
                <LineUp isEditMode={isEditMode?true:false} amount={amount} isCreate={true} players={players} setPlayers={setPlayers}/>
            </div>
        </Flex>
)
}

export default TeamBuilder