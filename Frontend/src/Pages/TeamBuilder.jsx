import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Flex,Separator } from '@radix-ui/themes';
import "../style/TeamBuilder.css"
import soccer_field from '../assets/soccer_field2.jpg'
import PlayerSelection from '../Components/PlayerSelection';
import LineUp from '../Components/LineUp';

function TeamBuilder() {
    const location = useLocation();
    const isEditMode = location.state?.isEditMode;
    const league_code = location.state?.league_code;
    const leagueId = location.state?.leagueId;
    const team_id = location.state?.team_id ;

    const [players,setPlayers] = useState(location.state?.players?location.state?.players:[])
    const [amount,setAmount] = useState('100M')
    
return (
        <Flex className="team-builder" direction="column" gap="2">
            <div className="playerSelect" >
                <PlayerSelection leagueId={leagueId} setAmount={setAmount} setPlayers={setPlayers} players={players} />
            </div>
            <div className='Line-up'>
                <LineUp team_id={team_id} league_code={league_code} isEditMode={isEditMode?true:false} amount={amount} isCreate={true} leagueId={leagueId} players={players} setPlayers={setPlayers}/>
            </div>
        </Flex>
)
}

export default TeamBuilder