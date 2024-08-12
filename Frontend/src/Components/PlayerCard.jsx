import { React,useState ,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayerStats from './PlayerStats';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
marginLeft: 'auto',
transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
}),
}));

export default function PlayerCard(props) {
    const [expanded, setExpanded] = useState(false);
    const [league, setLeague] = useState(props.leagueId);
    const [stats,setStats] = useState(null)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const getStatsByLeague = ()=>{
        const leagueStats = props.player.statistics.filter((stats)=>stats.league.id==league)
        // console.log(leagueStats)
        console.log(leagueStats[leagueStats.length-1])
        setStats(leagueStats[leagueStats.length-1])
    }

    useEffect(()=>{
        getStatsByLeague()
    },[])

return (
    <Card sx={{ maxWidth: '100%' }}>
    <CardHeader
        // avatar={
        //     // <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     //         R
        //     // </Avatar>
        // }
        action={
            <IconButton aria-label="settings">
            <MoreVertIcon />
            </IconButton>
        }
        title={<b>{props.player.player.name}</b>}
    />
    {/* <CardMedia
        component='img'
        height="194"
        image={props.player.player.photo}
        alt="Paella dish"
    /> */}
    <Avatar  sx={{ width: '40%', height: '40%' }} src={props.player.player.photo}></Avatar>
    <CardContent>
        <Typography variant="body2" color="text.secondary">
        {
            <div>
            <div><b>name:</b> {props.player.player.firstname+' '+props.player.player.lastname}</div>
            <div><b>age:</b> {props.player.player.age}</div>
            <div><b>birth:</b> {props.player.player.birth.date+" ("+props.player.player.birth.country+")"}</div>
            <div><b>nationality:</b> {props.player.player.nationality}</div>
            <div><b>height:</b> {props.player.player.height}</div>
            <div><b>weight:</b> {props.player.player.weight}</div>
            </div>
        }
        </Typography>
    </CardContent>
    <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
        <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
        <ShareIcon />
        </IconButton> */}
        <h4>statistics :</h4> 
        <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
        >
        <ExpandMoreIcon/>
        </ExpandMore>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        {/* {
            stats&&Object.entries(stats).map(([key, keyIndex]) => {
                return <Player/>
            })
        } */}
        <PlayerStats player={props.player}/>
        </CardContent>
    </Collapse>
    </Card>
);
}