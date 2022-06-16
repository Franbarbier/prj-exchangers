import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";


import './Checkout.css';
import InputField from '../InputField/InputField';
import Boton1 from '../Boton1/Boton1';


const Checkout = ({ recibia=0, enviaba=0 ,cometa, plataforma='',setOpenCheckout}) => {
    
    const [newMonto, setNewMonto] = useState(0)
    const cometaPor = cometa / 100 + 1


    const formasEntrega = ['Belgrano', 'Microcentro','Transferencia','Cripto']

       
  function render(){
      return  <div className="Checkout">
                <div>
                    <h6>Orden Nro. 5880</h6>

                   <InputField tipo="recibe" label="Nombre:" valueSetter={0} setNewMonto={setNewMonto} type={"text"} />
                   <InputField tipo="envia" label="Nombre de quién recibe:" valueSetter={0} setNewMonto={setNewMonto} type={"text"} />
                    <div className='toggler'>
                        <label>Oficina:</label>
                        {formasEntrega.map((forma)=>(
                            <div className="toggle-option">{forma}</div>
                        ))}
                    </div>

                   <InputField tipo="recibe" label="Horario de retiro:" valueSetter={0} setNewMonto={setNewMonto} type={"text"} />
                   <InputField tipo="envia" label="Monto a recibir" valueSetter={0} setNewMonto={setNewMonto} type={"text"} divisa="usd" />
                   <InputField tipo="recibe" label="Monto a Transferir" valueSetter={0} setNewMonto={setNewMonto} type={"text"} divisa="usd" />
        
                    <a onClick={ ()=> {setOpenCheckout(false)} }>
                        <Boton1 text={"Volver"} />
                    </a>
                   <Boton1 text={"Confirmar operación"} />
                 
                </div>
              </div>

       }
       
       
       return ( render() )
}




export default Checkout;