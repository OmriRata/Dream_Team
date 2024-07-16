import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
    border: 0,
    },
    }));


    // const rows = [
    // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    // createData('Eclair', 262, 16.0, 24, 6.0),
    // createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
    // ];



    export default function CustomizedTables(props) {

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
    function createData(leagueName, league_code, points, username,x) {
        return { username, leagueName, league_code, points ,x};
    }
    // const rows = props.teams.map((team)=>{

    // })

    return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
            <TableRow>
            {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell> */}
            <StyledTableCell align="left">Calories</StyledTableCell>
            <StyledTableCell align="left">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="left">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align='center'>Dessert (100g serving)</StyledTableCell>

            {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
            <StyledTableRow key={row.username}>
                {/* <StyledTableCell component="th" scope="row">
                {row.username}
                </StyledTableCell> */}
                <StyledTableCell align="left">{row.leagueName}</StyledTableCell>
                <StyledTableCell align="left">{row.league_code}</StyledTableCell>
                <StyledTableCell align="left">{row.points}</StyledTableCell>
                <StyledTableCell align='center' component="th" scope="row">
                {row.username}
                </StyledTableCell>
                {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
            </StyledTableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
    );
}