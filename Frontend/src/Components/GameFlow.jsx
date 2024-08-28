import React from "react";
import { Flex ,Button} from '@radix-ui/themes';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import '../style/GameFlow.css'
import { useNavigate } from "react-router-dom";




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor:'aliceblue',
    ...theme.typography.body2,
    padding: theme.spacing(1.1),
    textAlign: 'center',
    // opacity: '0.5',
    // fontFamily:'fantasy',
    fontSize:'17px',
    borderRadius:'5rem',
    border: '2px solid rgba(255,255,255,.2);',
    width:'100%',
    marginRight:'5%',
    marginBottom:'5%',   
    fontWeight:'bold',
    // backdropFilter: 'blur(20px);',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
    backgroundColor: 'red',
    }),
}));

function GameFlow(){
    const navigate = useNavigate()
    const info = ()=>{
        navigate("/ExplanationPage")
    }
    const flowSteps = [
        'Sign Up or Log In',
        'Create or Join a League',
        'Create a Team and Select Players',
        'Invite and Challenge Your Friends & Compete'

    ]
    return(
        // <Flex style={{marginTop:'20%'}} direction={'row'}>
        <div className="game_flow" >
            <h1 className="header">How to Play ?</h1>
            <Stack className="stack"  spacing={2}>

            {flowSteps.map((step,i)=>{
                return<Item className="item" id={i}>
                    {i+1} . {step}
                </Item>

            })
            }
            </Stack>
            <Button className="infoBtn" onClick={info} >
                        for more information
            </Button>
        </div>
        // </Flex>
    )
}

export default GameFlow;