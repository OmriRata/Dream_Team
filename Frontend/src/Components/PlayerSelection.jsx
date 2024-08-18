import React, { useEffect, useState, useRef } from 'react';
import Papa from 'papaparse';  // Import Papa Parse
import Slider from '@mui/material/Slider';
import Alert from '@mui/material/Alert';
import { Theme, TextField, Container, Box, Card, Flex, Avatar, Text, AlertDialog, Button, ScrollArea } from '@radix-ui/themes';
import '../style/PlayerSelection.css';
import { ReloadIcon } from '@radix-ui/react-icons';
import { playersData, barcePlayers, englandTeams, englandPlayers } from '../Data/data';
import axios from "axios";
import PlayerCard from './PlayerCard'
import Fillterbar from './Fillterbar'
function PlayerSelection(props) {
    const [open, setOpen] = useState(false);
    const [popUpPlayer, setPopUpPlayer] = useState(null);
    const [flag, setFlag] = useState(false);
    const [amountInt, setAmountInt] = useState(100);
    const InitialAmount = 100;
    const positionRef = useRef();
    const teamRef = useRef();
    const btnRef = useRef();
    const [allPlayers, setAll] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [positionFilter, setPositionFilter] = useState('');
    const [teamFilter, setTeamFilter] = useState('');
    const [league, setLeague] = useState(props.leagueId);
    const [teams, setTeams] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [csvData, setCsvData] = useState([]);  // State to store CSV data
    const disabled = true;
    const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'];
    const [value, setValue] = useState([1, 10]);
    const minDistance = 1;

    useEffect(() => {
        fetchTeams();
        fetchPlayers();
        fetchCsvData(); // Fetch CSV data when component mounts
    }, []);

    useEffect(() => {
        updateAmount();
    }, [props.players]);

    const fetchCsvData = async () => {
        try {
            const response = await fetch('/Data/selected_players_stats.csv');
            if (!response.ok) throw new Error('Network response was not ok');
            const text = await response.text();
            Papa.parse(text, {
                header: true,
                complete: (results) => {
                    setCsvData(results.data);
                },
                error: (error) => {
                    console.error("Error parsing CSV data: ", error);
                }
            });
        } catch (error) {
            console.error("Error fetching CSV file: ", error);
        }
    };

    const getPrice = (player, rating) => {
        const firstname = player.firstname.trim().toLowerCase();
        const lastname = player.lastname.trim().toLowerCase();
        const fullName = `${firstname} ${lastname}`;
        let found;
        for (const row of csvData) {
            const csvName = row.name.trim().toLowerCase();
    
            if (csvName === fullName || 
                csvName.includes(fullName) || 
                csvName.startsWith(firstname) || 
                csvName.endsWith(lastname)) {
                found = row;
                break;
            }
        }
        if (!found && !rating) {
            const csvNameFallback = csvData.find(row => {
                const csvName = row.name.trim().toLowerCase();
                return csvName.search(lastname);;
            });
            
            return csvNameFallback ? parseFloat(csvNameFallback['Overall Rating']/10).toFixed(1):0;
        }
        // Return the found rating or the passed rating
        return found ? parseFloat(found['Overall Rating'] / 10).toFixed(1) : parseFloat(rating).toFixed(1);
    };
    

    const updateAmount = () => {
        const newAmount = props.players.reduce((total, player) => {
            return total - getPrice(player.player,player.statistics[0].games.rating);
        }, InitialAmount);
        const amount =newAmount.toFixed(1)
        setAmountInt(amount);
        props.setAmount(amount.toString() + 'M');
    };

    const fetchTeams = async () => {
        try {
            const response = await axios.get(`/api/leagueTeams/${league}`);
            const data = response.data;
            setTeams(data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPlayers = async () => {
        try {
            const response = await axios.get(`/api/playersByLeague/${league}`);
            const players = response.data;
            setData(players);
            setAll(players);
            setFlag(true);
        } catch (e) {
            console.log(e);
        }
    };

    const checkPlayers = (player)=>{
        console.log("checkPlayers")
        const newPlayers = props.players.concat(player)
        const goalkeeperCount = newPlayers.filter(
            player => player.statistics[0].games.position == 'Goalkeeper').length;
        const defenderCount = newPlayers.filter(
            player => player.statistics[0].games.position == 'Defender').length;
        const midfielderCount = newPlayers.filter(
            player => player.statistics[0].games.position == 'Midfielder').length;
        const attackerCount = newPlayers.filter(
            player => player.statistics[0].games.position == 'Attacker').length;
        console.log("----------------------------------")    
        console.log(goalkeeperCount)
        console.log(defenderCount)
        console.log(midfielderCount)
        console.log(attackerCount)
        console.log(goalkeeperCount+defenderCount+midfielderCount+attackerCount)
        console.log("----------------------------------")
        if(goalkeeperCount+defenderCount+midfielderCount+attackerCount>11){
            return 'Players Limit'
        }else if(goalkeeperCount>1){
            return 'Goalkeeper'
        }else if(defenderCount>5){
            return 'Defender'
        }else if(midfielderCount>5){
            return 'Midfielder'
        }else if(attackerCount>3){
            return 'Attacker'
        }
    }

    const addPlayers = (player,e)=>{
        console.log("first")
        switch(checkPlayers(player)){
            case 'Goalkeeper':
                setErrorMsg('Only 1 Goalkeeper.')
                btnRef.current?.click()
                console.log("goalkeeper")
                break;
            case 'Defender':
                setErrorMsg('Only 3-5 Defender.')
                btnRef.current?.click()
                console.log("defender")
                break;
            case 'Midfielder':
                setErrorMsg('Only 2-5 Midfielder.')
                btnRef.current?.click()
                console.log("Midfielder")
                break;
            case 'Attacker':
                setErrorMsg('Only 1-3 Attacker.')
                btnRef.current?.click()
                console.log("Attacker")
                break;
            case 'Players Limit':
                setErrorMsg('You Can Choose Only 11 players.')
                btnRef.current?.click()
                break;
            default:props.setPlayers([
                ...props.players,
                player
            ]);
        }
        btnRef.current?.click()

        console.log(checkPlayers(player))
    } 

    const sliderChange = (event, newValue, activeThumb, x) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
            filterByPrice(Math.min(newValue[0], value[1] - minDistance), value[1]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
            filterByPrice(value[0], Math.max(newValue[1], value[0] + minDistance));
        }
    };

    const filterByPrice =(minValue,maxValue)=>{
        if(teamFilter =='' && positionFilter ==''){
            setData(
                allPlayers.filter((player)=>{
                    const price = getPrice(player.player,player.statistics[0].games.rating);
                    return price>=minValue && price<=maxValue
                    })
            )
        }else if(positionFilter ==''){
            setData(
                allPlayers.filter((player)=>{
                    const price = getPrice(player.player,player.statistics[0].games.rating);
                    return price>=minValue && price<=maxValue 
                            && player.statistics[0].team.name == teamFilter
                    })
            )
        }else if(teamFilter ==''){
            setData(
                allPlayers.filter((player)=>{
                    const price = getPrice(player.player,player.statistics[0].games.rating);
                    return price>=minValue && price<=maxValue 
                            && player.statistics[0].games.position == positionFilter
                    })
            )

        }else{
            setData(
                allPlayers.filter((player)=>{
                    const price = getPrice(player.player,player.statistics[0].games.rating);
                        return price>=minValue && price<=maxValue 
                            && player.statistics[0].games.position == positionFilter
                            && player.statistics[0].team.name == teamFilter
                    })
            )

        }
        

    }
    const playerPopUp = () => {
        return (
            <AlertDialog.Root open={open}>
                <AlertDialog.Trigger>
                    <button ref={btnRef} hidden variant="soft">Size 2</button>
                </AlertDialog.Trigger>
                <AlertDialog.Content style={{ bottom: '0px' }} size="2" maxWidth="25%">
                    <Flex direction={'column'}>
                        <PlayerCard leagueId={league} player={popUpPlayer} />
                        <AlertDialog.Cancel asChild>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                        </AlertDialog.Cancel>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        );
    };

    return (
        <div className='player-selection'>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <button ref={btnRef} hidden variant="soft">Size 2</button>
                </AlertDialog.Trigger>
                <AlertDialog.Content size="2" maxWidth="400px">
                    <Alert severity="warning" variant="outlined">{errorMsg}</Alert>
                    <AlertDialog.Cancel>
                        <Button style={{ marginTop: '16px' }} variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <Container className='search'>
                <h1 className='text-center mt-4'>Add Players</h1>
                <form className='search-form'>
                    <Theme radius="large">
                        <TextField.Root size="3" onChange={(e) => { setSearch(e.target.value) }} placeholder="Search Players…">
                            <TextField.Slot side="right" px="1">
                                <Button size="2">Send</Button>
                            </TextField.Slot>
                        </TextField.Root>
                    </Theme>
                </form>

                {flag && <Flex className='fillterCat' direction={'column'} gap={'4'}>
                    <Flex direction={'row'} gap={6}>
                        <Fillterbar
                            getPrice={getPrice}
                            priceRange={value}
                            ref={teamRef}
                            setTeamFilter={setTeamFilter}
                            positionFilter={positionFilter}
                            teamFilter={teamFilter} players={data}
                            setPlayers={setData}
                            placeholder={'Team'}
                            allPlayers={allPlayers}
                            values={teams}
                            setPositionFilter={setPositionFilter}
                        />
                        <Button onClick={() => resetTeamFillter()} width='100%' color="gray" variant="classic" >
                            <ReloadIcon />
                            Reset
                        </Button>
                    </Flex>
                    <Flex direction={'row'} gap={6}>
                        <Fillterbar
                            className='filter'
                            getPrice={getPrice}
                            priceRange={value}
                            ref={positionRef}
                            setPositionFilter={setPositionFilter}
                            positionFilter={positionFilter}
                            teamFilter={teamFilter}
                            setTeamFilter={setTeamFilter}
                            players={data}
                            allPlayers={allPlayers}
                            setPlayers={setData}
                            placeholder={'Position'}
                            values={positions} />
                        <Button onClick={() => resetPositionFillter()} width='100%' color="gray" variant="classic">
                            <ReloadIcon />
                            Reset
                        </Button>
                    </Flex>
                    <Flex direction={'row'} gap={6}>
                        <Text className='priceHeader'>Price:</Text>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Slider
                            marks
                            step={1}
                            getAriaLabel={() => 'Minimum distance shift'}
                            value={value}
                            onChange={sliderChange}
                            valueLabelDisplay="auto"
                            min={1}
                            max={10}
                            disableSwap
                        />
                    </Flex>
                </Flex>}

                <ScrollArea className='scroll' type="always" scrollbars="vertical" size="3" style={{ height: 600, color: 'ActiveBorder' }}>
                    {data.filter(i => {
                        return search.toLowerCase() === '' ? i : i.player.name.toLowerCase().includes(search);
                    }).map((item, index) => {
                        return <Box key={index} className='player-box' width='350px'>
                            <Card size="2">
                                <Flex position="relative" gap="3" align="center">
                                    <Flex onClick={() => { setPopUpPlayer(item); setOpen(true) }}>
                                        <Avatar size="5" src={item.player.photo} radius="full" fallback="T" color="indigo" />
                                        <Box className='boxx'>
                                            <Text as="div" size="2" weight="bold">
                                                {item.player.name}
                                            </Text>

                                            <Text as="div" size="2" color="gray">
                                                {item.statistics[0].games.position}
                                            </Text>
                                            <Flex>
                                                <Text as="div" size="2" color="black">
                                                    {item.statistics[0].team.name}&nbsp;
                                                </Text>
                                                <Avatar size="1" src={item.statistics[0].team.logo}></Avatar>
                                            </Flex>
                                        </Box>
                                    </Flex>
                                    <label className='price'>price :{getPrice(item.player,item.statistics[0].games.rating)}M</label>
                                    {
                                        props.players.some(player => player.player.id === item.player.id) ?
                                            <Button color="gray" style={{ backgroundColor: "gray" }} disabled={disabled} variant="soft" onClick={(e) => addPlayers(item, e)} className='addBtn'>Add</Button>
                                            :
                                            <Button color="cyan" disabled={!disabled} variant="soft" onClick={(e) => addPlayers(item, e)} className='addBtn'>Add</Button>
                                    }
                                </Flex>
                            </Card>
                        </Box>
                    })}
                </ScrollArea>

            </Container>

            {playerPopUp()}
        </div>
    );
}

export default PlayerSelection;
