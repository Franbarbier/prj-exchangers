import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ScrollToTop from './ScrollToTop';

import { AppProvider } from './contexts/AppContext';
import { verifyUser } from './api';
import './css-global.css';

import Home from './views/Home/Home';
import Panel from './views/Panel/Panel';
import Login from './views/Login/Login';
import ShutDown from './views/ShutDown/ShutDown';



const App = () => {


  const [activeTab, setActiveTab] = useState('')
  const [user, setUser] = useState({})

  useEffect(()=>{
    verifyUser().then((res)=>setUser(res))
    
  }, [])

  useEffect(()=>{
    console.log(user)
  }, [user])


  function render(){
    return (
      <>
      
        <Router>
          <AppProvider>
          <ScrollToTop/>
            <Routes>
                <Route path="/" element={<ShutDown setActiveTab={setActiveTab} />} />
                <Route path="/admin-panel" element=
                    { !user.mail ?
                      <Login setUser={setUser} />
                    :
                      <Panel setActiveTab={setActiveTab} />
                    }
                />
            </Routes>
            </AppProvider>
        </Router>
      
      </>
    );
  }

  return (
    render()        
  )

}

export default App;