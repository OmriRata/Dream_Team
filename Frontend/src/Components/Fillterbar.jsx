import React, { useEffect, useState } from "react";
import {Avatar, Button, Select, Separator} from '@radix-ui/themes'
const { forwardRef, useImperativeHandle } = React;
import '../style/PlayerSelection.css'
import { ResetIcon } from '@radix-ui/react-icons';
import {Flex} from '@radix-ui/themes'



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
            
            props.setPlayers(
                allPlayers.filter((player)=>{
                    const price = props.getPrice(player.statistics[0].games.rating);
                    return player.statistics[0].games.position == position
                        && price >= props.priceRange[0] && price <= props.priceRange[1]
                })
            )
        }else{
            props.setPlayers(
                allPlayers.filter((player)=>{
                    const price = props.getPrice(player.statistics[0].games.rating);
                    return player.statistics[0].team.name == props.teamFilter 
                        && player.statistics[0].games.position == position
                        && price >= props.priceRange[0] && price <= props.priceRange[1]
                })
            )
        }
    }

    useEffect(()=>{
        // setPlay(props.players)
        // setAllPlayers(props.players)
    },[])
    
    useEffect(()=>{
        setAllPlayers(props.players)
    },[allPlayers,props.placeholder])

    const filterByteam = (team)=>{
        const teamName = team.name
        props.setTeamFilter(teamName)
        if(props.positionFilter ==''){
            props.setPlayers(
                allPlayers.filter((player)=>{
                    const price = props.getPrice(player.statistics[0].games.rating);
                    return player.statistics[0].team.name == teamName
                        && price >= props.priceRange[0] && price <= props.priceRange[1]
                })
                
            )
        }else{
            props.setPlayers(
                allPlayers.filter((player)=>{
                    const price = props.getPrice(player.statistics[0].games.rating);
                    return player.statistics[0].team.name == teamName 
                        && player.statistics[0].games.position == props.positionFilter
                        && price >= props.priceRange[0] && price <= props.priceRange[1]
                })
            )
        }
    }
    

    return (
        <Flex>
        <Select.Root key={key} color='red'  onValueChange={placeholder=='Position'?filterByPosition:filterByteam}>
            <Select.Trigger radius='large' style={{width:'100%'}} color="green" placeholder={props.placeholder}/> 
                <Select.Content color="blue" variant="solid" highContrast>
                {
                    props.values.map((val,i)=>{
                        return <Select.Item style={{width:'100%'}} key={i} value={val}>
                            <Avatar src={props.placeholder =='Position'?val:val.logo} style={{marginRight:'10px'}} size={'1'}></Avatar>
                            {props.placeholder =='Position'?val:val.name}
                            </Select.Item>
                    })
                }
                </Select.Content>
                </Select.Root>
            </Flex>

    )

})

export default Fillterbar;