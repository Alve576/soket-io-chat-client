import React from 'react'
import { useState } from 'react';
import useAuth from './../../hooks/useAuth';
import { TextField, Button, Container, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [loginData,setLoginData] = useState({});
  const {handleLogin} = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(loginData.email,loginData.password)
  }
  const handleChange = (e) => {
    const  feild = e.target.name;
    const value  = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[feild]  = value;
    setLoginData(newLoginData);
  };
  return (
    <Container>
      <Typography variant='h3'>Login in now.</Typography>
      <form onSubmit={(e) => handleSubmit(e)}>
            <TextField sx={{mt: 5}}onChange={handleChange} fullWidth name='email' type='email' placeholder='email'/><br/>
            <TextField sx={{mt: 5}}onChange={handleChange} fullWidth name='password' type='password' placeholder='password'/><br/>
            <NavLink to='/'>Don't have any account?</NavLink><br/>
            <Button variant='contained' sx={{mt: 5}}color='success' type='submit'>Login</Button>
      </form>
    </Container>
  )
};

export default Login