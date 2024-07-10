import React, { useEffect, useState } from "react";
import {Avatar, Button, Select, Separator} from '@radix-ui/themes'
const { forwardRef, useImperativeHandle } = React;



const Fillterbar = forwardRef((props,ref)=>{

    const [key, setKey] = useState(+new Date())

    const [players,setPlay] = useState([])
    const [allPlayers,setAllPlayers] = useState([])
    const [placeholder,setPlaceHolder] = useState(props.placeholder)

    useImperativeHandle(ref, () => ({

        resetFilters() {
            setKey(+new Date())
            setPlaceHolder(props.placeholder)
        }
    
    }));

    const filterByPosition = (position)=>{
        props.setPositionFilter(position)
        if(props.teamFilter ==''){
            console.log("first")
            console.log(props.positionFilter)
            console.log("first")
            
            props.setPlayers(
                allPlayers.filter(player=>player.statistics[0].games.position == position)
            )
        }else{
            props.setPlayers(
                allPlayers.filter(player=>player.statistics[0].team.name == props.teamFilter 
                    && player.statistics[0].games.position == position
                )
            )
        }
    }

    useEffect(()=>{
        setPlay(props.players)
    },[players,props.players])

    useEffect(()=>{
        setAllPlayers(props.players)
    },[allPlayers,props.placeholder])

    const filterByteam = (team)=>{
        const teamName = team.name
        props.setTeamFilter(teamName)
        if(props.positionFilter ==''){
            console.log("first")
            console.log(props.positionFilter)
            console.log("first")
            
            props.setPlayers(
                allPlayers.filter(player=>player.statistics[0].team.name == teamName)
            )
        }else{
            props.setPlayers(
                allPlayers.filter(player=>player.statistics[0].team.name == teamName 
                    && player.statistics[0].games.position == props.positionFilter
                )
            )
        }
    }

    return (
        <Select.Root key={key}  onValueChange={placeholder=='Position'?filterByPosition:filterByteam}>
            <Select.Trigger radius="full" color="gray" placeholder={props.placeholder}/> 
                <Select.Content color="gray" variant="solid" highContrast>
                {/* <Select.Item id="place/holder" disabled> {placeholder}</Select.Item> */}
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

})

export default Fillterbar;