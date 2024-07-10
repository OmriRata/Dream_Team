import React from 'react'
import Slider from '@mui/material/Slider';
import {Theme,TextField,Container,Box,Card,Flex,Avatar,Text, Button,ScrollArea } from '@radix-ui/themes'
import '../style/PlayerSelection.css'
import {playersData,barcePlayers, englandTeams,englandPlayers} from '../Data/data'
import { useEffect, useState,useRef } from 'react'
import Fillterbar from './Fillterbar'
import axios from "axios";


function PlayerSelection(props) {
    const positionRef = useRef();
    const teamRef = useRef();
    const [allPlayers,setAll] = useState([]);
    const [data,setData] = useState([]);
    const [search,setSearch] = useState('');
    const [positionFilter,setPositionFilter] = useState('');
    const [teamFilter,setTeamFilter] = useState('');
    const [league,setLeague] = useState('39');
    const [teams,setTeams] = useState([]);
    const disabled = true;
    const positions = [
        'Goalkeeper','Defender','Midfielder','Attacker']
    const [value,setValue] = useState([1,10])
    const minDistance = 1;


    const resetFillters = ()=>{
        positionRef.current.resetFilters()
        teamRef.current.resetFilters()
        setData(allPlayers)
        setPositionFilter('')
        setTeamFilter('')
        setValue([1,10])
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
    const getPrice = (rating)=>{
        if(rating == undefined){
            return 2
        }
        else{
            rating = (parseFloat(rating)- Math.floor(parseFloat(rating)))*10
            if(parseFloat(rating)- Math.floor(parseFloat(rating))>0.5){
                return Math.ceil(parseFloat(rating))
            }
            return Math.floor(parseFloat(rating))
        }
    }
    const fetchPlayers = async ()=>{
        try {
            // const response = await axios.get("/api/playersByLeague/"+league);
            // const players = response.data
            // console.log(players)
            // setData(players)
            // setAll(players)
            setAll(englandPlayers)
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

    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
            filterByPrice(newValue[0],value[1])
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
            filterByPrice(value[0],newValue[1])
        }
        
    };

    const filterByPrice =(minValue,maxValue)=>{
        if(teamFilter =='' && positionFilter ==''){
            setData(
                allPlayers.filter((player)=>{
                    const price = getPrice(player.statistics[0].games.rating);
                    return price>=minValue && price<=maxValue
                    })
            )
        }else if(positionFilter ==''){
            setData(
                allPlayers.filter((player)=>{
                    const price = getPrice(player.statistics[0].games.rating);
                    return price>=minValue && price<=maxValue 
                            && player.statistics[0].team.name == teamFilter
                    })
            )
        }else if(teamFilter ==''){
            setData(
                allPlayers.filter((player)=>{
                    const price = getPrice(player.statistics[0].games.rating);
                    return price>=minValue && price<=maxValue 
                            && player.statistics[0].games.position == positionFilter
                    })
            )

        }else{
            setData(
                allPlayers.filter((player)=>{
                    const price = getPrice(player.statistics[0].games.rating);
                        return price>=minValue && price<=maxValue 
                            && player.statistics[0].games.position == positionFilter
                            && player.statistics[0].team.name == teamFilter
                    })
            )

        }
        

    }
    
    
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
                        
                        <Fillterbar
                        getPrice={getPrice}
                        priceRange={value}
                        ref={teamRef}
                        setTeamFilter={setTeamFilter}
                        positionFilter={positionFilter}
                        teamFilter={teamFilter} players={data}
                        setPlayers={setData}
                        placeholder={'Team'}
                        values={teams} />

                        <Fillterbar
                        getPrice={getPrice}
                        priceRange={value}
                        ref={positionRef}
                        setPositionFilter={setPositionFilter}
                        positionFilter={positionFilter}teamFilter={teamFilter}
                        players={data}
                        setPlayers={setData}
                        placeholder={'Position'}
                        values={positions} />
                        <Text style={{color:'gray',marginTop:'0.7%'}}>Price:</Text>
                        <Slider
                        marks
                        aria-label='Restricted values'
                        step={1}
                        getAriaLabel={() => 'Minimum distance shift'}
                        value={value}
                        onChange={handleChange1}
                        valueLabelDisplay="auto"
                        min={1}
                        max={10}
                        // getAriaValueText="valuetext"
                        disableSwap
                        />
                    </Flex>
                    <Button color="gray" variant="classic" onClick={resetFillters}>
                            Reset Filters
                        </Button>
                <ScrollArea className='scroll' type="always" scrollbars="vertical" size="3" style={{ height: 600 ,color:'ActiveBorder'}}>
                        {data.filter(i=>{
                            return search.toLowerCase()===''? i: i.player.name.toLowerCase().includes(search);
                        }).map((item,index)=>{
                            return  <Box key={index} className='player-box' width='350px'>
                                        <Card size="2">
                                            <Flex position="relative" gap="3" align="center">
                                                <Avatar size="5" src={item.player.photo} radius="full" fallback="T" color="indigo" />
                                                <Box className='boxx'>
                                                <Text as="div" size="2" weight="bold">
                                                    {/* {data[0] && data[0].name} */}
                                                    {item.player.name}
                                                </Text>
                                                
                                                <Text as="div" size="2" color="gray">
                                                    {/* Engineering */}
                                                    {item.statistics[0].games.position}
                                                </Text>
                                                <Flex>
                                                <Text as="div" size="2" color="black">
                                                    {/* Engineering */}
                                                    {item.statistics[0].team.name}&nbsp;
                                                </Text>
                                                <Avatar size="1" src={item.statistics[0].team.logo}></Avatar>
                                                </Flex>
                                                </Box> 
                                                <label className='price'>price :{getPrice(item.statistics[0].games.rating)}M</label>
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