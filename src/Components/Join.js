import React from 'react'
import io from "socket.io-client";
import { useState } from "react";
import { Box, Button, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Chat from './Chat';


const socket = io.connect("https://soket-chat-server.herokuapp.com");

const Join = () => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const navigate = useNavigate();
    const joinRoom = () => {
      if (username !== "" && room !== "") {
        socket.emit("join_room", room);
        setShowChat(true);
      }
    };
  
  return (
    <Box sx={{display : 'flex',justifyContent: 'center',height : '92.6vh'}}>
        {
          !showChat ? (
            <Box sx={{mt : 10}}>
          <Typography variant="h4" sx={{textAlign : 'center'}}>Join A Chat</Typography>
          <Box sx={{textAlign : "left"}}>
            <h5 variant="h5">Enter Your Name For Room</h5>
            <TextField
              color='secondary'
              fullWidth
              type="text"
              placeholder="John..."
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <h5 variant="h5">Enter Your Room Id To Join</h5>
            <TextField
              color='secondary'
              fullWidth
              type="text"
              placeholder="Room ID..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            /><br/>
            <p>By clicking "Join", you agree to our <span>Terms of Services</span> <br/> and <span>Privacy Statement</span> <input type='checkbox'/></p>
          </Box>
            <Button variant='outlined' color='success' onClick={joinRoom}>Join A Room</Button>
        </Box>
          ):(
          <Chat socket={socket} username={username} room={room}/>)
        }
    </Box>

  )
}

export default Join