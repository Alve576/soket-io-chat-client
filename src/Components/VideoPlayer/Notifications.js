import { Button } from '@mui/material';
import React from 'react'
import useAuth from '../../hooks/useAuth';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useAuth();

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
}

export default Notifications