import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";


import './Checkout.css';
import InputField from '../InputField/InputField';
import Boton1 from '../Boton1/Boton1';
import Calculadora from '../Calculadora/Calculadora';


const Checkout = ({ cometa, plataforma='',setOpenCheckout, platformData, dataOpereta, setDataOpereta, setEnviar, setRecibir}) => {
    
    const [newMonto, setNewMonto] = useState(0)
    const [oficina, setOficina] = useState()
    const cometaPor = cometa / 100 + 1
    const [linkWpp, setLinkWpp] = useState()
    
    const formasEntrega = ['Belgrano', 'Microcentro','Transferencia','Cripto']
    
    var linea = '5491134536136'

  
    useEffect(()=>{
        console.log(linkWpp)
    }, [linkWpp])

    useEffect(()=>{
        setDataOpereta({...dataOpereta, oficina: oficina})
    }, [oficina])
       
  function render(){
      return  <div className="Checkout">
                <div>
                    <h6>Orden Nro. 5880</h6>

                   <div className="InputField">
                        <label>Nombre: </label>                        
                        <input type="text" onChange={ (e)=>{ setDataOpereta({...dataOpereta, nombre: e.target.value}) }}  />
                    </div>
                    <div className="InputField">
                        <label>Nombre de quién retira: </label>                        
                        <input type="text" onChange={ (e)=>{ setDataOpereta({...dataOpereta, retira: e.target.value}) }}  />
                    </div>

                   {/* <InputField tipo="" label="Nombre de quién recibe:" valueSetter={""} setNewMonto={} type={"text"} /> */}
                    <div className='toggler'>
                        <label>Oficina:</label>
                        {formasEntrega.map((forma)=>(
                            <div  onClick={()=>{ setOficina(forma) }} className={`toggle-option ${oficina == forma && 'selected'}`}><span>{forma}</span></div>
                        ))}
                    </div>

                   <Calculadora
                        platformData={platformData} 
                        dataOpereta={dataOpereta}
                        enviar={dataOpereta.monto_a_enviar}
                        recibir={dataOpereta.monto_a_recibir}
                        setDataOpereta={setDataOpereta} 
                        setRecibir={setRecibir} 
                        setEnviar={setEnviar} 
                        type="number" 
                        divisa='usd' 
                        plataforma={plataforma.nombre} 
                    />
        
                    <div>
                        <a onClick={ ()=> {setOpenCheckout(false)} }>
                            <Boton1 text={"Volver"} />
                        </a>
                        <a
                            target='_blank'

                            href={`wa.me/${linea}?text=*Nombre:*%20${dataOpereta.nombre}%0a%0a*Quién retira:*%20${dataOpereta.retira}%0a%0a*Oficina:*%20${dataOpereta.oficina}%0a%0a*Plataforma:*%20${dataOpereta.platform}%0a%0a*Día:*%20${Object.values(dataOpereta.fecha)[0]}%0a%0a*Monto a enviar:*%20${dataOpereta.monto_a_enviar}%0a%0a*Monto a recibir:*%20${dataOpereta.monto_a_recibir}
                            `}

                            // onClick={ ()=>{ console.log(`wa.me/${linea}?text=*Nombre:*%20${dataOpereta.nombre}%0a%0a*Quién retira:*%20${dataOpereta.retira}%0a%0a*Oficina:*%20${dataOpereta.oficina}%0a%0a*Plataforma:*%20${dataOpereta.platform}%0a%0a*Día:*%20${Object.values(dataOpereta.fecha)[0]}%0a%0a*Monto a enviar:*%20${dataOpereta.monto_a_enviar}%0a%0a*Monto a recibir:*%20${dataOpereta.monto_a_recibir}`) } }
                        >
                            <Boton1 text={"Confirmar operación"} />
                        </a>

                    </div>
                 
                </div>
              </div>

       }
       
       
       return ( render() )
}




export default Checkout;