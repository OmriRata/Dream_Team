import React from 'react'
import {TextField,Container,Box,Card,Flex,Avatar,Text, Button, Separator,ScrollArea } from '@radix-ui/themes'
import '../style/PlayerSelection.css'
import Data from '../Data/data'
import { useEffect, useState } from 'react'


function PlayerSelection(props) {
    const [data,setData] = useState([]);
    const [search,setSearch] = useState('');
    const disabled = true;
    function abc(){
        setData(Data)
    }

    const addPlayers = (player,e)=>{
        props.setPlayers([
            ...props.players,
            player
        ]);
    } 
    useEffect(() => {
        abc()
    }, [data])

    return (
        <div className='player-selection'>
            <Container className='search'>
                <h1 className='text-center mt-4'>Add Players</h1>
                <form className='search-form'>
                    <Flex>
                    <TextField.Root className='my-3' variant="soft" onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search Players…" />
                    <Button className='searchBtn'>Search</Button>
                    </Flex>
                </form>
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