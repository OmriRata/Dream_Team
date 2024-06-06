import React from 'react'
import { TextField,Container,Box,Card,Flex,Avatar,Text, Button, Separator,ScrollArea } from '@radix-ui/themes'
import '../style/PlayerSelection.css'
import Data from '../Data/data'
import { useEffect, useState } from 'react'


function PlayerSelection() {
    const [data,setData] = useState([]);
    function abc(){
        setData(Data)
        console.log("first")
    }
    useEffect(() => {
        abc()
    }, [data])

    return (
        <div className='player-selection'>
            <div >
            <Container className='search'>
                <h1 className='text-center mt-4'>Add Players</h1>
                <form className='search-form'>
                    <Flex>
                    <TextField.Root className='my-3' variant="soft" placeholder="Search Players…" />
                    <Button className='searchBtn'>Search</Button>
                    </Flex>
                </form>
                
                <table className='tbl' striped bordered hover>
                <ScrollArea className='scroll' type="always" scrollbars="vertical" size="3" style={{ height: 700 ,color:'ActiveBorder'}}>
                <tbody>
                        {data.map((item,index)=>{
                            return<tr key={index}>
                                    <Box className='player-box' width='350px'>
                                        <Card size="1">
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
                                                <Button className='addBtn'>Add</Button>
                                            </Flex>

                                        </Card>
                                    </Box>

                                </tr>
                        })}
                </tbody>
                </ScrollArea>

                </table>
            </Container>
    </div>
        </div>
    )
}

export default PlayerSelection