import { Grid, Typography } from '@mui/material'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import Options from './Options'

const VideoPlayer = () => {
    const {myVideo,userVideo,name,callAccepted,callEnded,call,stream} = useAuth()
  return (
    <div>
        {
            stream && (
                <Grid>  
                    <Typography>{name||'Name'}</Typography>
                    <video playsInline muted ref={myVideo} autoPlay />
                </Grid>
            )
        }
        {
            callAccepted && !callEnded &&(
                <Grid>
                    <Typography>{call.name||'Name'}</Typography>
                    <video playsInline muted ref={userVideo} autoPlay />
                </Grid>
                
            )
        }
       
       <Grid>
           <Options></Options>
       </Grid>
    </div>
  )
}

export default VideoPlayer