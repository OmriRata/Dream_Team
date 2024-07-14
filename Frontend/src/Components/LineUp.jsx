import React, { useEffect, useRef, useState } from 'react'
import '../style/LineUp.css'
import { Avatar, Button, Flex, Box, Grid,Card,AlertDialog } from '@radix-ui/themes'
import Alert from '@mui/material/Alert'
import axios from "axios";



function LineUp(props) {
    const league_code = 16000;
    const [isCreateMode,setIsCreateMode] = useState(props.isCreate)
    const btnRef = useRef();
    const [errorMsg,setError] = useState('You Need to Choose 11 players')
    // const errorMsg= 'You Need to Choose 11 players';


    const removePlayer = (player)=>{
        props.setPlayers(props.players.filter(p => p.player.id !== player.player.id))
    }

    function addplayers(id, position) {
        const player = props.players.find(p => p.player.id === id);
        if (player && position == player.statistics[0].games.position) {
            return <Box key={id} className='plyr' size="9" width='250'>
                            {isCreateMode?<Button className='rmvBtn' size='1' color="red" radius='full' onClick={()=>{removePlayer(player)}}>X</Button>:<></>}
                            <Avatar className='plyrImg' size="5" src={player.player.photo} radius='full' fallback="T" color="indigo" />
                            {/* <h5 className='plyrName'><span>{player.player.name}</span></h5> */}
                    </Box>
        }
    }
    
    useEffect(()=>{
    },[props.players])

    const createTeam = async ()=>{
        if(props.players.length<11){
            console.log(props.players)
            setError(errorMsg)
            btnRef.current?.click()
        }
        else{
            try {
                const response = await axios.post('/users/addTeam', {
                    players : props.players,
                    league_code:league_code,
                    username:localStorage.getItem("username")
                });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }

    }

    return (
        <div className='line-up'>
            <h1 className='teamH1'>My Team:</h1>
            <Flex className='line' direction="column" rows="4" gap="3" width="auto">
                <div id='goalkeeper' className='position goalkeeper'>
                    {
                        props.players.map((player, i) => {
                            return addplayers(player.player.id, "Goalkeeper")
                        })
                    }
                </div>

                <div id='defender' className='position defender'>
                    {
                        props.players.map((player, i) => {
                            return addplayers(player.player.id, "Defender")
                        })
                    }
                </div>
                <div id='midfielder' className='position midfielder'>
                    {
                        props.players.map((player, i) => {
                            return addplayers(player.player.id, "Midfielder")
                        })
                    }
                </div>
                <div id='attacker' className='position attacker'>
                    {
                        props.players.map((player, i) => {
                            return addplayers(player.player.id, "Attacker")
                        })
                    }
                </div>
            </Flex>
            {isCreateMode?<Button on onClick={createTeam} className='applyBtn'> Apply </Button>:<></>}
            <AlertDialog.Root>
            <AlertDialog.Trigger>
                <button ref={btnRef} hidden variant="soft">Size 2</button>
            </AlertDialog.Trigger>
            <AlertDialog.Content size="2" maxWidth="400px">
                <Alert severity="warning" variant="outlined">{errorMsg}</Alert>
                <AlertDialog.Cancel>
                    <Button style={{ marginTop: '16px' }}variant="soft" color="gray">
                    Cancel
                    </Button>
                </AlertDialog.Cancel>
            </AlertDialog.Content>
        </AlertDialog.Root>
        </div>
    )
}

export default LineUp