import React from 'react'
import { TextField,Container,Box,Card,Flex,Avatar,Text, Button, Separator } from '@radix-ui/themes'
import '../style/PlayerSelection.css'



function PlayerSelection() {
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
                <table striped bordered hover>
                <tbody>
                        <tr key={'1'}>
                            <Box width='350px'>
                                <Card size="1">
                                    <Flex position="relative" gap="4" align="center">
                                        <Avatar size="3" radius="full" fallback="T" color="indigo" />
                                        <Box>
                                        <Text as="div" size="2" weight="bold">
                                            Teodros Girmay
                                        </Text>
                                        
                                        <Text as="div" size="2" color="gray">
                                            Engineering
                                        </Text>
                                        
                                        </Box>
                                    
                                        <Button className='addBtn'>Add</Button>
                                        
                                        
                                        
                                    </Flex>
                                </Card>
                            </Box>

                        </tr>
                </tbody>
                </table>
            </Container>
    </div>
        </div>
    )
}

export default PlayerSelection