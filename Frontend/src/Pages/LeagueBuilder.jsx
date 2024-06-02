import React ,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import "../style/LeagueBuilder.css"
import logo from "../assets/download.png"
import FormInput from '../Components/FormInput'
import { Flex, Text, Button,Select } from '@radix-ui/themes';


const LAEGUES = ['Spain','England','Garmny','France','Italy'];



function LeagueBuilder(){
    const [value, setValue] = useState('');

    const fatchData = ()=>{
        fetch('/api/teamId/barcelona')
        .then(res => res.json())
        .then(data => console.log(data))
    }
    useEffect(()=>{
    },[])

    return (
        <div className="league-builder">
            <Flex direction="row" gap="2">
                <Flex className="logo-container" direction="column">
                    <h1>Create Your Fantasy Football League</h1>
                    <img className="logo" src={logo} alt="" />
                </Flex>
            <form className="league-form">
                <FormInput placeholder="League Name"/>
                <Flex direction="column" className="flex1">
                    <Text className="selectlabel">
                        Choose Leauge:
                    </Text>
                    <Select.Root className="selectLeague" value={value} onValueChange={setValue}>
                        <Select.Trigger placeholder="chosoe league" className="trigger">{value}</Select.Trigger>
                        <Select.Content className="content">
                            {LAEGUES.map((league,i)=>{
                                return <Select.Item className="selectItem" key={i} value={league}>{league}</Select.Item>
                            })}
                        </Select.Content>
                    </Select.Root>
                </Flex>
                <Button className="league-btn" color="crimson" variant="soft">Create League</Button>
            </form>
            </Flex>
        </div>
    )
}

export default LeagueBuilder;