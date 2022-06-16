import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";


import './InputField.css';


const InputField = ({ label='', type='text', id='', divisa='', valueSetter, tipo, setNewMonto}) => {
    
       // const setTipo = tipo

       // valueSetter = valueSetter.toFixed(2) * 1
       // console.log(valueSetter)

       
  function render(){
      return  <div className="InputField">
                 <label>{label}</label>
                 <b>{divisa}</b>
                 
                 <input className={tipo} type={type} value={valueSetter} onChange={ (e)=>{ setNewMonto( [tipo , e.target.value] ) }}  id={id} />
                
              </div>

       }
       
       
       return ( render() )
}




export default InputField;