import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";


import './Calculadora.css';
import InputField from '../InputField/InputField';


const Calculadora = ({type='text', id='', divisa='',cometa, plataforma='', setDataOpereta, dataOpereta}) => {
    

    const [recibir, setRecibir] = useState(0)
    const [enviar, setEnviar] = useState(0)
    const [newMonto, setNewMonto] = useState(0)
    const cometaPor = cometa / 100 + 1

    // useEffect(()=>{
    //     console.log(cometaPor * enviar)
    // })

    useEffect(()=>{
        if (newMonto[0] == 'recibe' ) {
            setRecibir(newMonto[1])
            setEnviar(newMonto[1] * cometaPor )
        }else{
            setEnviar(newMonto[1])
            setRecibir(newMonto[1] / cometaPor )
        }
    }, [newMonto] )


    useEffect(()=>{
        setDataOpereta({...dataOpereta, monto_a_enviar : enviar, monto_a_recibir : recibir})
    }, [recibir,enviar])

       
  function render(){
      return  <div className="Calculadora">
                   <InputField tipo="recibe" label="Cuánto querés recibir" valueSetter={recibir} setNewMonto={setNewMonto} type={type} divisa={divisa} />
                   <InputField tipo="envia" label="Cuánto tenés que enviar" valueSetter={enviar} setNewMonto={setNewMonto} type={type} divisa={divisa} /> 
                 
              </div>

       }
       
       
       return ( render() )
}




export default Calculadora;