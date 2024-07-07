import React from 'react'
import {Theme,TextField,Container,Box,Card,Flex,Avatar,Text, Button, Slider,ScrollArea } from '@radix-ui/themes'
import '../style/PlayerSelection.css'
import {playersData,barcePlayers, englandTeams,englandPlayers} from '../Data/data'
import { useEffect, useState } from 'react'
import Fillterbar from './Fillterbar'
import axios from "axios";


function PlayerSelection(props) {
    const [data,setData] = useState([]);
    const [search,setSearch] = useState('');
    const [league,setLeague] = useState('39');
    const [teams,setTeams] = useState([]);
    const disabled = true;
    const positions = [
        'Goalkeeper','Defender','Midfielder','Attacker']
    const resetFillters = ()=>{
        fetchPlayers()   
    }
    const fetchTeams = async ()=>{
        try {
            // const response = await axios.get("/api/leagueTeams/"+league);
            // const data = response.data
            // setTeams(data)
            setTeams(englandTeams)
        }
        catch(error){
            console.log(error)
        }

    }

    const fetchPlayers = async ()=>{
        try {
            // const response = await axios.get("/api/playersByLeague/"+league);
            // const players = response.data
            // console.log(players)
            // const newData = []
            // for(const item of data){
            //     newData.push(item.player)
            // } 
            // setData(players)
            // console.log(newData)
            setData(englandPlayers)
        }
        catch(e){
            console.log(e)
        }

    }

    const addPlayers = (player,e)=>{
        props.setPlayers([
            ...props.players,
            player
        ]);
    } 

    useEffect(() => {
        // setData(playersData.concat(barcePlayers)) 
        fetchTeams()
        fetchPlayers()

    },[])

    return (
        <div className='player-selection'>
            <Container className='search'>
                <h1 className='text-center mt-4'>Add Players</h1>
                <form className='search-form'>
                    <Theme radius="large">
                        <TextField.Root size="3" onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search Players…">
                            <TextField.Slot side="right" px="1">
                                <Button size="2">Send</Button>
                            </TextField.Slot>
                        </TextField.Root>
                    </Theme>
                </form>
                <Flex className='fillterCat' direction={'row'} gap={'4'}>
                        
                        <Fillterbar players={data} setPlayers={setData} placeholder={'Teams'} values={teams} />
                        <Fillterbar players={data} setPlayers={setData} placeholder={'Position'} values={positions} />

                        <Text style={{color:'gray',marginTop:'0.7%'}}>Price:</Text>
                        <Slider className='slider' defaultValue={[25, 75]} />
                    </Flex>
                    <Button color="gray" variant="classic" onClick={resetFillters}>
                            Reset Filters
                        </Button>
                <ScrollArea className='scroll' type="always" scrollbars="vertical" size="3" style={{ height: 700 ,color:'ActiveBorder'}}>
                        {data.filter(i=>{
                            return search.toLowerCase()===''? i: i.player.name.toLowerCase().includes(search);
                        }).map((item,index)=>{
                            return  <Box key={index} className='player-box' width='350px'>
                                        <Card size="2">
                                            <Flex position="relative" gap="4" align="center">
                                                <Avatar size="3" src={item.player.photo} radius="full" fallback="T" color="indigo" />
                                                <Box>
                                                <Text as="div" size="2" weight="bold">
                                                    {/* {data[0] && data[0].name} */}
                                                    {item.player.name}
                                                </Text>
                                                
                                                <Text as="div" size="2" color="gray">
                                                    {/* Engineering */}
                                                    {item.statistics[0].games.position}
                                                </Text>

                                                </Box> 
                                                  
                                                <label className='price'>price {item.statistics[0].games.rating}</label>
                                                {
                                                props.players.includes(item)?
                                                <Button color="gray" style={{backgroundColor:"gray"}}  disabled={disabled} variant="soft" onClick={(e)=>addPlayers(item,e)} className='addBtn'>Add</Button>
                                                :
                                                <Button color="cyan" disabled={!disabled} variant="soft" onClick={(e)=>addPlayers(item,e)} className='addBtn'>Add</Button>
                                                }
                                            </Flex>

                                        </Card>
                                    </Box>

                        })}
                </ScrollArea>

            </Container>
        </div>
    )
}

export default PlayerSelection