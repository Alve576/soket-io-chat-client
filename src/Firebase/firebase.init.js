import { initializeApp } from "firebase/app";
import firebaseConfig from './firebase.config';


const fireApp = () => {
    initializeApp(firebaseConfig);
}


export default fireApp;