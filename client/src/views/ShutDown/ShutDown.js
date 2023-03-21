import React, { useState, useEffect, useRef } from 'react';


import './ShutDown.css';


const ShutDown = ({ setActiveTab }) => {
  
  

  function render(){
      return  <div id="ShutDown-view">
                <div>
                  <img src="/assets/logo-l.png"/>
                  <h2>Por el momento este sitio se encuentra fuera de servicio :(</h2>
                </div>
              </div>

       }
       
       
       return ( render() )
}




export default ShutDown;