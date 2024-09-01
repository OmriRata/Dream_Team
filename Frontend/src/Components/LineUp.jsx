import React, { useEffect, useRef, useState } from 'react'
import '../style/LineUp.css'
import { Avatar, Button, Flex, Box, Grid,Card,AlertDialog } from '@radix-ui/themes'
import Alert from '@mui/material/Alert'
import axios from "axios";
import { useNavigate } from 'react-router-dom';



function LineUp(props) {
    const navigate = useNavigate();
    const league_code = props.league_code;
    const [isCreateMode,setIsCreateMode] = useState(props.isCreate)
    const btnRef = useRef();
    const [errorMsg,setError] = useState('You Need to Choose 11 players')
    const [open, setOpen] = useState(false);
    const [teamName, setTeamName] = useState('');


    // const errorMsg= 'You Need to Choose 11 players';
    const checkPlayers = ()=>{
        const goalkeeperCount = props.players.filter(
            player => player.statistics[0].games.position == 'Goalkeeper').length;
        const defenderCount = props.players.filter(
            player => player.statistics[0].games.position == 'Defender').length;
        const midfielderCount = props.players.filter(
            player => player.statistics[0].games.position == 'Midfielder').length;
        const attackerCount = props.players.filter(
            player => player.statistics[0].games.position == 'Attacker').length;

        
        if(goalkeeperCount+defenderCount+midfielderCount+attackerCount<11){
            setError('You Need to Choose 11 players')
            return false
        }else if(goalkeeperCount<1){
            setError('You Need to Choose 1 Goalkeeper.')
            return false
        }else if(defenderCount<3){
            setError('You Need to Choose 3-5 Defender.')
            return false
        }else if(midfielderCount<2){
            setError('You Need to Choose 2-5 Midfielder.')
            return false
        }else if(attackerCount<1){
            setError('You Need to Choose 1-3 Attacker.')
            return false
        }
        return true
    }
        
    const removePlayer = (player)=>{
        props.setPlayers(props.players.filter(p => p.player.id !== player.player.id))
    }

    function addplayers(id, position) {
        
        const player = props.players.find(p => p.player.id === id);
        if (player && position == player.statistics[0].games.position) {
            return <Box onClick={()=>console.log(player)} key={id} className='plyr' size="9" width='250'>
                            {isCreateMode?<Button className='rmvBtn' size='1' color="red" radius='full' onClick={()=>{removePlayer(player)}}>X</Button>:<></>}
                            <Avatar className='plyrImg' size="5" src={player.player.photo} radius='full' fallback="T" color="indigo" />
                            <h5 className='plyrName'><span>{player.player.name}</span></h5>
                    </Box>
        }
        
    }

    const createTeam = async ()=>{
        if(!checkPlayers()){
            setOpen(true)
            return
        }else if(teamName==''||teamName==' '){
            setError('Enter your team Name')
            setOpen(true)
        }
        else{
            try {
                const response = await axios.post('/users/addTeam', {
                    players : props.players,
                    teamName:teamName,
                    leagueId:props.leagueId,
                    league_code:league_code,
                    amount:props.amount,
                    username:localStorage.getItem("username")
                });
                console.log(response.data);
                navigate('/team')
            } catch (error) {
                console.error(error);
            }
        }
    }

    const editTeam = async ()=>{
        
        if(!checkPlayers()){
            setOpen(true)
            return
        }
        else{
            try {
                const response = await axios.post('/users/updateTeam', {
                    players : props.players,
                    team_id :props.team_id,
                    amount:props.amount
                });
                navigate('/team')
            } catch (error) {
                console.error(error);
            }
        }
    }
    return (
        <div className='line-up'>
            {isCreateMode?<Flex className='cont' direction={'row'} gap={'5'}>
                    {!props.isEditMode&&<input className='team-name' onChange={e=>setTeamName(e.target.value)}  placeholder={'Team Name:'} />}
                    <h1 className='teamH1'>Amount: {props.amount}</h1>
            </Flex>
            :<></>
            }
            <Flex className={isCreateMode?'line':"line2"} direction="column" rows="4" gap="3" width="auto">
                <div id='goalkeeper' className='position goalkeeper'>
                    {
                        props.players.map((player, i) => {
                            if('Goalkeeper'== player.statistics[0].games.position){
                                return addplayers(player.player.id, "Goalkeeper")
                            }                        
                        })
                    }
                    
                </div>

                <div id='defender' className='position defender'>
                    {
                        props.players.map((player, i) => {
                            if('Defender'== player.statistics[0].games.position){
                                return addplayers(player.player.id, "Defender")
                            }
                        })
                    }
                </div>
                <div id='midfielder' className='position midfielder'>
                    {
                        props.players.map((player, i) => {
                            if('Midfielder'== player.statistics[0].games.position){
                                return addplayers(player.player.id, "Midfielder")
                            }

                        })
                    }
                </div>
                <div id='attacker' className='position attacker'>
                    {
                        props.players.map((player, i) => {
                            if('Attacker'== player.statistics[0].games.position){
                                return addplayers(player.player.id, "Attacker")
                            }                        
                        })
                    }
                </div>
            </Flex>
            {isCreateMode?<Button onClick={props.isEditMode?editTeam:createTeam} className='applyBtn'> {props.isEditMode?"Update":"Apply"} </Button>:<></>}

            <AlertDialog.Root  open ={open}>
            <AlertDialog.Trigger>
                <button ref={btnRef} hidden variant="soft">Size 2</button>
            </AlertDialog.Trigger>
            <AlertDialog.Content size="2" maxWidth="400px">
                <Alert severity="warning" variant="outlined">{errorMsg}</Alert>
                <AlertDialog.Cancel>
                    <Button onClick={()=>setOpen(false)} style={{ marginTop: '16px' }}variant="soft" color="gray">
                    Cancel
                    </Button>
                </AlertDialog.Cancel>
            </AlertDialog.Content>
        </AlertDialog.Root>
        </div>
    )
}

export default LineUp