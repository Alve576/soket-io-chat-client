import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Chat from './Components/Chat';
import Join from './Components/Join';
import fireApp from './Firebase/firebase.init';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home/Home';
import Messages from './Components/Messages';
import AuthProvider from './Context/AuthProvider';
import Login from './Pages/Login/Login';
import VideoPlayer from './Components/VideoPlayer/VideoPlayer';

fireApp();

function App() {

  return (
        <AuthProvider>
            <BrowserRouter>
              <Routes>
              <Route path='/' element={
                    <Dashboard />
                }>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/join' element={<Join/>}></Route>
                <Route path='/messages' element={<Messages/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/videocall' element={<VideoPlayer/>}></Route>
                </Route>
              </Routes>
              
            </BrowserRouter>
        </AuthProvider>
  );
}

export default App;