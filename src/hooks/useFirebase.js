import React,{useEffect, useRef} from 'react'
import { getIdToken,onAuthStateChanged,getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { SetMeal } from '@mui/icons-material';



const useFirebase = () => {
    const [user,setUser] = useState({});
    const [token, setToken] = useState('');
    const auth = getAuth();
    const socket = io('http://localhost:3001');
    const [stream,setStream] = useState(null);
    const [me,setMe] = useState("");
    const [call,setCall] = useState({});
    const [callAccepted,setCallAccepted] = useState(false);
    const [callEnded,setCallEnded] = useState(false);
    const [name,setName] = useState("");

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((currentStream) => {
            setStream(currentStream);
    
            myVideo.current.srcObject = currentStream;
          });
    
        socket.on('me', (id) => setMe(id));
    
        socket.on('callUser', ({ from, name: callerName, signal }) => {
          setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
      }, []);


      const answerCall = () => {
        setCallAccepted(true);
    
        const peer = new Peer({ initiator: false, trickle: false, stream });
    
        peer.on('signal', (data) => {
          socket.emit('answerCall', { signal: data, to: call.from });
        });
    
        peer.on('stream', (currentStream) => {
          userVideo.current.srcObject = currentStream;
        });
    
        peer.signal(call.signal);
    
        connectionRef.current = peer;
      };

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });
    
        peer.on('signal', (data) => {
          socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });
    
        peer.on('stream', (currentStream) => {
          userVideo.current.srcObject = currentStream;
        });
    
        socket.on('callAccepted', (signal) => {
          setCallAccepted(true);
            
          peer.signal(signal);
        });
        alert('calling');
        connectionRef.current = peer;
        console.log(peer)
      };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.distroy();
        window.location.reload();
    }


    const handleRegister =  (name,email,password ) => {
        console.log(name,email,password)
        createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                // Signed in 
                const newUser = { email, displayName : name };
                
                setUser(newUser)
                alert('login succesfull !!!!!')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
        }


        const handleLogin = (email,password) => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ..
                alert('login successfull')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        }

        const handleLogout = () => {
            signOut(auth).then(() => {
                // Sign-out successful.
                alert('sdjbasjdbasjhd')
              }).catch((error) => {
                // An error happened.
              });
        }
        useEffect(() => {
            const unsubscribed = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user);
                    getIdToken(user)
                        .then(idToken => {
                            setToken(idToken);
                        })
                } else {
                    setUser({})
                }
            });
            return () => unsubscribed;
        }, [auth])
    return {
        handleRegister,
        user,
        handleLogout,
        handleLogin,
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall
    }
}

export default useFirebase