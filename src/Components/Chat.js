import React, { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import './../App.css'
import { Avatar, Box, Container, Typography, TextField, Button, IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideocamIcon from '@mui/icons-material/Videocam';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation } from "react-router-dom";
import Alert from '@mui/material/Alert';

function Chat({ socket, username, room }) {
  

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <Box className="chat-window">
      <div className="chat-header">
        <Box sx={{display : 'flex'}}>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Typography>Live Chat</Typography>
        </Box>
        <Box sx={{display : 'flex'}}>
          <IconButton onClick={()=> window.location.reload()} sx={{color : '#4eac6d',mx : 2}}>
              <LogoutIcon/>
            </IconButton>
          <IconButton sx={{color : '#4eac6d',mx : 2}}>
            <LocalPhoneIcon/>
          </IconButton>
          <IconButton sx={{color : '#4eac6d',mx : 2}}>
            <VideocamIcon/>
          </IconButton>
        </Box>
      </div>
      <Box className="chat-body">
         <ScrollToBottom className="message-container">
         {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >

                <Box sx={{display : 'flex'}}>
                  <div className="message-meta">
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <p id="author">{messageContent.author}</p>
                    <p id="time">{messageContent.time}</p>
                  </div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  
                </Box>
              </div>
            );
          })}
         </ScrollToBottom>
          
      </Box>
      <Box className="chat-footer">
         
          <IconButton sx={{color : '#4eac6d'}}>
            <LinearScaleIcon/>
          </IconButton>
          <IconButton sx={{color : '#4eac6d'}}>
            <AttachFileIcon/>
          </IconButton>
        <input
          type="text"
          value={currentMessage}
          placeholder="Type Your Massage..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <IconButton sx={{color : '#4eac6d'}}>
          <InsertEmoticonIcon/>
        </IconButton>
        <IconButton sx={{backgroundColor : '#212529',color : '#4eac6d'}}>
          <SendIcon/>
        </IconButton>
      </Box>
    </Box>
  );
}

export default Chat;