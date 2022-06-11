import React, { useState } from 'react'
import useAuth from './../../hooks/useAuth'
import Notifications from './Notifications';
import {Button, Container,Grid,TextField,Typography} from '@mui/material';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Phone, PhoneDisabled } from '@mui/icons-material';
const Options = () => {
  const {setName,me,callAccepted,callEnded,call,name,leaveCall,callUser} = useAuth()
  const [idToCall,setIdToCall] = useState("");
  
  return (
      <Container>
        <form noValidate autoComplete='off'>
            <Grid item xs={12} md={6}>
                <Typography>Account Info</Typography>
                <TextField label='Name' value={name} onChange={(e)=> setName(e.target.value)} fullWidth/>
                {console.log(me)}               
                <CopyToClipboard text={me}>
                  <Button variant='contained' color='primary'>
                      Copy your id
                  </Button>
                </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography>Make a call</Typography>
                <TextField label='ID' value={idToCall} onChange={(e)=> setIdToCall(e.target.value)} fullWidth/>
                {callAccepted && !callEnded ? (
                <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall}>
                  Hang Up
                </Button>
              ) : (
                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() =>{callUser(idToCall)}}>
                  Call
                </Button>
              )}            
            </Grid>
        </form>
        <Notifications/>
      </Container>
    )
}

export default Options  