import React from 'react'
import {Link, Box, Typography, Button, Grid } from '@mui/material';
import  MessageIcon  from '@mui/icons-material/Message';
import { NavLink } from 'react-router-dom';
import Login from '../../Pages/Login/Login';
import Signup from '../../Pages/Login/Signup';

const Home = () => {
  return (
    <Box sx={{display: 'flex',alignItems : 'center',height: '90vh',justifyContent : 'space-between',p : 5}}>
      <Grid lg={8} sx={{display: "flex",flexDirection : 'column',alignItems : 'baseline'}}>
                    <Typography variant='h3'>Premium Web Communication.</Typography>
                    <Typography variant='h3'>Now free for everyone.</Typography>
                    <Typography variant='p'>We re-engineered the service we built for secure business meetings,<br/> Google Meet, to make it free and available for all.</Typography><br/>
                    <NavLink to='/join'>
                        <Button variant='outlined' color='success'>Create a custom room </Button><br/>
                    </NavLink>
                    <Link>Learn more about Alap</Link>
            </Grid>
       <Grid lg={10}>
                <Signup/>

       </Grid>
    </Box>
  )
}

export default Home