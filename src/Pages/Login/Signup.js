import React from 'react'
import { useState } from 'react';
import useAuth from './../../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { TextField, Button, Containe,Grid,Typography,Link,Container } from '@mui/material';
import { Box } from '@mui/system';

const Signup = () => {
  const [loginData,setLoginData] = useState({});
  const {handleRegister} = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(loginData.name,loginData.email,loginData.password)
  }
  const handleChange = (e) => {
    const  feild = e.target.name;
    const value  = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[feild]  = value;
    setLoginData(newLoginData);
  }
  return (
    <Box sx={{display: 'flex',alignItems : 'center',height: '90vh',justifyContent : 'space-between',p : 5}}>
          <Container>
                <Typography variant='h3'>Create Your Account.</Typography>
                <form onSubmit={(e) => handleSubmit(e)}>
                        <TextField sx={{mt: 5}}onChange={handleChange} fullWidth name='name' type='name' placeholder='name'/><br/>
                        <TextField sx={{mt: 5}}onChange={handleChange} fullWidth name='email' type='email' placeholder='email'/><br/>
                        <TextField sx={{mt: 5}}onChange={handleChange} fullWidth name='password' type='password' placeholder='password'/><br/>
                        <div className="">
                            <input type="file" id="file-input" name="ImageStyle"/>
                        </div><br/>
                        <NavLink to='/login'>Already have an account?</NavLink><br/>
                        <Button variant='contained' sx={{mt: 5}}color='success' type='submit'>Register</Button>
                </form>
          </Container>
    </Box>
  )
};

export default Signup