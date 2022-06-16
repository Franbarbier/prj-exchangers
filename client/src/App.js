import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ScrollToTop from './ScrollToTop';

import { AppProvider } from './contexts/AppContext';

import './css-global.css';

import Home from './views/Home/Home';



const App = () => {


  const [activeTab, setActiveTab] = useState('')


  function render(){
    return (
        <Router>
          <AppProvider>
          <ScrollToTop/>
            <Routes>
                <Route path="/" element={<Home setActiveTab={setActiveTab} />} />
            </Routes>
            </AppProvider>
        </Router>
    );
  }

  return (
    render()        
  )

}

export default App;