import React, { useEffect } from 'react'
import '../style/LineUp.css'
import field from '../assets/soccer_field2.jpg'
import { Avatar, Button, Flex, Box, Grid,Card } from '@radix-ui/themes'
import data from '../Data/data'

function LineUp(props) {

    const removePlayer = (player)=>{
        props.setPlayers(props.players.filter(p => p.id !== player.id))
    }

    function addplayers(id, position) {
        const player = props.players.find(p => p.id === id);
        if (player && position == player.position) {
            return <Box className='plyr' size="9" width='250'>
                            <Button className='rmvBtn' size='1' color="red" radius='full' onClick={()=>{removePlayer(player)}}>X</Button>
                            <Avatar className='plyrImg' size="5" src={player.photo} radius='full' fallback="T" color="indigo" />
                            <h5 className='plyrName'><span>{player.name}</span></h5>
                    </Box>
        }
    }
    useEffect(()=>{
    },[props.players])
    return (
        <div className='line-up'>
            <h1 className='teamH1'>My Team:</h1>
            <Flex className='line' direction="column" rows="4" gap="3" width="auto">
                <div id='goalkeeper' className='position goalkeeper'>
                    {
                        props.players.map((player, i) => {
                            return addplayers(player.id, "Goalkeeper")
                        })
                    }
                </div>

                <div id='defender' className='position defender'>
                    {
                        props.players.map((player, i) => {
                            return addplayers(player.id, "Defender")
                        })
                    }
                </div>
                <div id='midfielder' className='position midfielder'>
                    {
                        props.players.map((player, i) => {
                            return addplayers(player.id, "Midfielder")
                        })
                    }
                </div>
                <div id='attacker' className='position attacker'>
                    {
                        props.players.map((player, i) => {
                            return addplayers(player.id, "Attacker")
                        })
                    }
                </div>
            </Flex>
            <Button className='applyBtn'> Apply </Button>

        </div>
    )
}

export default LineUp