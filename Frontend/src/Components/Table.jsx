import React,{ useEffect, useState }  from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead, { tableHeadClasses } from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button,Flex,Separator} from '@radix-ui/themes';
import { FiAlignRight } from 'react-icons/fi';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({username, theme }) => ({
    // '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
    // },
    border:theme.palette.grey,
    backgroundColor:username == localStorage.getItem('username') ? theme.palette.primary.light  :theme.palette.action.hover,
    // hide last border
    '&:last-child td, &:last-child th': {
    border: 0,
    },
}));

export default function CustomizedTables(props) {
    const [participants,setParticipants] = useState([])

    useEffect(()=>{
        // sort the league table 
        const sortParticipants = props.participants.sort((userA,userB)=>userB.points-userA.points) 
        setParticipants(sortParticipants)
    },[])

    return (
    <TableContainer component={Paper} style={{padding:'10px', margin:'20px'}}>
        <Flex style={{justifyContent:'space-between'}} >
        <h2><b>League</b> : {props.leagueName} </h2>
        {/* <Separator my={'0'} orientation="vertical" color="cyan" size="2"  /> */}
        <Button onClick={i=>console.log(props.leagueCode)} style={{float:'right;!important'}}>Invite friend</Button>
        </Flex>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
            <TableRow>
            {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell> */}
            <StyledTableCell align='left'>place</StyledTableCell>
            <StyledTableCell align='left'>user</StyledTableCell>
            <StyledTableCell align="left">Calories</StyledTableCell>
            <StyledTableCell align="left">budget remain</StyledTableCell>
            <StyledTableCell align="left">points</StyledTableCell>
            {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
        </TableHead>
        <TableBody> 
            {participants.map((participant,id) => (
                
            <StyledTableRow username={participant.user} key={id} >
                {/* <StyledTableCell component="th" scope="row">
                {row.username}
                </StyledTableCell> */}
                <StyledTableCell align="left">{id+1}</StyledTableCell>
                <StyledTableCell align='left' component="th" scope="row">
                {participant.user}
                </StyledTableCell>
                <StyledTableCell align="left">{participant.leagueName}</StyledTableCell>
                <StyledTableCell align="left">{participant.league_code}</StyledTableCell>
                <StyledTableCell align="left">{participant.points}</StyledTableCell>
                {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}

            </StyledTableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
    );
}