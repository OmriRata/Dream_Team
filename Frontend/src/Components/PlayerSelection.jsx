import React from 'react'
import {Theme,TextField,Container,Box,Card,Flex,Avatar,Text, Button, Slider,ScrollArea,Separator } from '@radix-ui/themes'
import '../style/PlayerSelection.css'
import {playersData,barcePlayers} from '../Data/data'
import { useEffect, useState } from 'react'
import Fillterbar from './Fillterbar'


function PlayerSelection(props) {
    const [data,setData] = useState([]);
    const [search,setSearch] = useState('');
    const disabled = true;
    const filters = [
        {'Position':['Goalkeeper','Defender','Midfielder','Attacker']},
        {'Teams':['Barcelone','Arsenal']},
    ]
    const resetFillters = ()=>{
        setData(playersData.concat(barcePlayers))    
    }

    const addPlayers = (player,e)=>{
        props.setPlayers([
            ...props.players,
            player
        ]);
    } 
    useEffect(() => {
        setData(playersData.concat(barcePlayers))    

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
                        {

                            filters.map((i,key)=>{
                                const placeholder = Object.keys(i)[0]
                                const values = Object.values(i)[0]
                                return <Fillterbar key={key} players={data} setPlayers={setData} placeholder={placeholder} values={values} />
                            })
                        }
                        <Text style={{color:'gray',marginTop:'0.7%'}}>Price:</Text>
                        <Slider className='slider' defaultValue={[25, 75]} />
                    </Flex>
                    <Button color="gray" variant="classic" onClick={resetFillters}>
                            Reset Filters
                        </Button>
                <ScrollArea className='scroll' type="always" scrollbars="vertical" size="3" style={{ height: 700 ,color:'ActiveBorder'}}>
                        {data.filter(i=>{
                            return search.toLowerCase()===''? i: i.name.toLowerCase().includes(search);
                        }).map((item,index)=>{
                            return  <Box key={index} className='player-box' width='350px'>
                                        <Card size="2">
                                            <Flex position="relative" gap="4" align="center">
                                                <Avatar size="3" src={item.photo} radius="full" fallback="T" color="indigo" />
                                                <Box>
                                                <Text as="div" size="2" weight="bold">
                                                    {/* {data[0] && data[0].name} */}
                                                    {item.name}
                                                </Text>
                                                
                                                <Text as="div" size="2" color="gray">
                                                    {/* Engineering */}
                                                    {item.position}
                                                </Text>

                                                </Box> 
                                                {item.id.toString().startsWith('2')?
                                                <label className='price'>price : 31222M</label>
                                                :    
                                                <label className='price'>price : 22M</label>
                                            } {
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