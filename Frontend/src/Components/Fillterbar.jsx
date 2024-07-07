import React, { useEffect, useState } from "react";
import {Avatar, Select, Separator} from '@radix-ui/themes'



function Fillterbar(props){
    const [players,setPlay] = useState([])
    const [placeholder,setPlaceHolder] = useState(props.placeholder)

    const filterByPosition = (position)=>{
        setPlaceHolder("hello")
        props.setPlayers(
            players.filter((player)=>{
                return player.position == position
            })
        )
        }

    useEffect(()=>{
        setPlay(props.players)
    },[players])

    const filterByteam = ()=>{
        console.log('team')
    }

    return (
        <Select.Root  className='231' onValueChange={props.placeholder =='Position'?filterByPosition: filterByteam}>
            <Select.Trigger radius="full" color="gray" placeholder={placeholder}/>
                <Select.Content color="gray" variant="solid" highContrast>
                {
                    props.values.map((val,i)=>{
                        return <Select.Item key={i} value={val}>
                            <Avatar src={"https://media.api-sports.io/football/players/336653.png"} style={{marginRight:'10px'}} size={'1'}></Avatar>
                            {val}
                            </Select.Item>
                    })
                }
                </Select.Content>
                <Separator color="cyan" orientation="vertical" size="2" />
                </Select.Root>
    )

}

export default Fillterbar;