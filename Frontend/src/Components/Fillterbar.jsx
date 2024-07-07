import React, { useEffect, useState } from "react";
import {Avatar, Select, Separator} from '@radix-ui/themes'



function Fillterbar(props){
    const [players,setPlay] = useState([])
    const [placeholder,setPlaceHolder] = useState(props.placeholder)

    const filterByPosition = (position)=>{
        props.setPlayers(
            players.filter(player=>player.statistics[0].games.position == position
            )
        )
    }

    useEffect(()=>{
        setPlay(props.players)
    },[players])

    const filterByteam = (team)=>{
        const teamName = team.name
        console.log(teamName)
        props.setPlayers(
            players.filter(player=>player.statistics[0].team.name == teamName
            )
        )
    }

    return (
        <Select.Root  className='231' onValueChange={props.placeholder =='Position'?filterByPosition: filterByteam}>
            <Select.Trigger radius="full" color="gray" placeholder={placeholder}/>
                <Select.Content color="gray" variant="solid" highContrast>
                {
                    props.values.map((val,i)=>{
                        return <Select.Item key={i} value={val}>
                            <Avatar src={props.placeholder =='Position'?val:val.logo} style={{marginRight:'10px'}} size={'1'}></Avatar>
                            {props.placeholder =='Position'?val:val.name}
                            </Select.Item>
                    })
                }
                </Select.Content>
                <Separator color="cyan" orientation="vertical" size="2" />
                </Select.Root>
    )

}

export default Fillterbar;