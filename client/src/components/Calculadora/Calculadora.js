import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";


import './Calculadora.css';
import InputField from '../InputField/InputField';


const Calculadora = ({type='text', id='', divisa='', plataforma='', setDataOpereta, dataOpereta, platformData, setEnviar, setRecibir, enviar=0, recibir=0}) => {
    

    
    const [newMonto, setNewMonto] = useState(0)
    const [cometaPor, setCometaPor] = useState( dataOpereta.fecha ? Object.values(dataOpereta.fecha)[0] / 100 + 1 : Object.values(platformData.fecha_entrega[0])[0] / 100 + 1 )
    // const cometaPor = cometa / 100 + 1

    useEffect(()=>{
        let newData = dataOpereta
        newData.fecha = platformData.fecha_entrega[0]
        setDataOpereta(newData)
     }, [])

    useEffect(()=>{
        if (newMonto[0] == 'recibe' ) {
            setRecibir(newMonto[1] * 1)
            setEnviar((newMonto[1] * cometaPor) )
        } else if(newMonto[0] == 'envia'){
            setEnviar(newMonto[1] * 1)
            setRecibir((newMonto[1] / cometaPor) ) 
        }
    }, [newMonto] )


    useEffect(()=>{
        setDataOpereta({...dataOpereta, monto_a_enviar : enviar, monto_a_recibir : recibir})
    }, [recibir,enviar])

       
  function render(){
      return  <div className="Calculadora">
                                      
                   <div className="InputField">
                        <label>Fechas para retirarlo</label>
                        <div>
                            <select onChange={(e)=>{
                                setDataOpereta({...dataOpereta, fecha: JSON.parse(e.target.value)})
                                setCometaPor( Object.values(JSON.parse(e.target.value)) / 100 + 1)
                            // setDataOpereta({...operetaData, fecha: })
                            }}>
                                {platformData.fecha_entrega.map((fecha)=>(
                                    <option value={JSON.stringify(fecha)}>{`${Object.keys(fecha)} - ${Object.values(fecha)}%`}</option>
                                ))}
                            </select>
                        </div>
                        {/* <input className={tipo} type={type} value={valueSetter} onChange={ (e)=>{ setNewMonto( [tipo , e.target.value] ) }}  id={id} /> */}
                        
                    </div>
                   <InputField tipo="recibe" label="Cuánto querés recibir" valueSetter={recibir} setNewMonto={setNewMonto} type={type} divisa={divisa} />
                   <InputField tipo="envia" label="Cuánto tenés que enviar" valueSetter={enviar} setNewMonto={setNewMonto} type={type} divisa={divisa} /> 
                 
              </div>

       }
       
       
       return ( render() )
}




export default Calculadora;