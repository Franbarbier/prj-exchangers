import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";


import './Boton1.css';


const Boton1 = ({ text }) => {
    

       
  function render(){
      return  <button className="Boton1">
                 {text}
              </button>

       }
       
       
       return ( render() )
}




export default Boton1;