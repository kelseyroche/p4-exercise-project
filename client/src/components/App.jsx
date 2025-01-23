import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import Login from './Login.jsx'
import Logout from './Logout.jsx';
import Register from './Register.jsx'
import Account from './Account.jsx'
import LoggedInContainer from './LoggedInContainer.jsx'
import RoutineContainer from './RoutineContainer.jsx';
import EditRoutineContainer from './EditRoutineContainer.jsx';
import ComingSoon from './ComingSoon.jsx'

import '../assets/css/theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import header from '../assets/header.png'

function App() {
  const navigate = useNavigate();
  
  // state to track whether the user is authenticated
  const defaultUserData = {id: null, name: null, email: null}
  const [userData, setUserData] = useState(defaultUserData)

  const handleLogout = () => {
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userName");
      setUserData(defaultUserData)
  }

  useEffect(() => {
    const sessionUserData = {
      id: localStorage.getItem('userId'),
      name: localStorage.getItem('userName'),
      email: localStorage.getItem('userEmail')
    }
    console.log(sessionUserData)
    
    if (sessionUserData.id == null || sessionUserData.id == "undefined") {
      navigate('/login');
    } else {
      setUserData(sessionUserData)
    }
  }, []);

  return (
    <> 
     <img src={header} alt="Header" style={{ width: '100%', height: 'auto' }} />
     <Routes>
        <Route path="/" element={<LoggedInContainer userData={userData}><RoutineContainer /></LoggedInContainer>} />
        <Route path="/account" element={<LoggedInContainer userData={userData}><Account /></LoggedInContainer>} />
        <Route path="/edit-routine" element={<LoggedInContainer userData={userData}><EditRoutineContainer /></LoggedInContainer>} />
        <Route path="/exercises" element={<LoggedInContainer userData={userData}><ComingSoon endpoint={"exercises"} /></LoggedInContainer>} />
        <Route path="/login" element={<Login userData={userData} setUserData={setUserData} />} />
        <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
