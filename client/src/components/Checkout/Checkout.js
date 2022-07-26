import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

import parse from 'html-react-parser';

import './Checkout.css';
import InputField from '../InputField/InputField';
import Boton1 from '../Boton1/Boton1';
import Calculadora from '../Calculadora/Calculadora';


const Checkout = ({ cometa, plataforma='',setOpenCheckout, platformData, dataOpereta, setDataOpereta, setEnviar, setRecibir, setPlatformData}) => {
    
    const [newMonto, setNewMonto] = useState(0)
    const [hovered, setHovered] = useState(false)
    const [oficina, setOficina] = useState()
    const cometaPor = cometa / 100 + 1
    const [linkWpp, setLinkWpp] = useState()
    
    const formasEntrega = [{
        ofi : 'Belgrano',
        info: `<ul> Podria retirar:</br>
        <li>Parte o totalidad en Pesos</li>
        <li>Parte o totalidad en USD</li>
        <li>Parte por transferencia o deposito</li>
        <li>Parte Cripto</li>
        </ul>`
    },
    {
        ofi : 'Comega',
        info: `<ul> Podria retirar:</br>
        <li>Parte o totalidad en Pesos</li>
        <li>Parte o totalidad en USD</li>
        <li>Parte por transferencia o deposito</li>
        <li>Parte Cripto</li>
        </ul>`
    },
    {
        ofi : 'Cripto',
        info: `<p>Totalidad en cripto</p>`
    },
    {
        ofi : 'Transferencia',
        info: `<p>Totalidad en transferencia</p>`
    },
    
    ]
    
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
                     <div className="plataf-name">
                                <div>
                                  <img className='plataf-icon' src={`https://storage.googleapis.com/prj-calculadora/iconos/${plataforma?.icon_url}`} />

                                  <h4>
                                    {plataforma.nombre}
                                  </h4>
                                </div>
                                <img 
                                  onClick={ (e)=>{ 
                                    if(plataforma.nombre == platformData?.nombre) {
                                        e.stopPropagation()
                                        setPlatformData(null)
                                        setOpenCheckout(false)
                                     }
                                  } } 
                                  src="/assets/mas.png" />

                              </div>

                   <div className="InputField">
                        <label>Nombre: </label>                        
                        <input type="text" onChange={ (e)=>{ setDataOpereta({...dataOpereta, nombre: e.target.value}) }}  />
                    </div>
                    {/* <div className="InputField">
                        <label>Nombre de quién retira: </label>                        
                        <input type="text" onChange={ (e)=>{ setDataOpereta({...dataOpereta, retira: e.target.value}) }}  />
                    </div> */}

                    <div className='toggler'>
                        <label>Oficina:</label>
                        {formasEntrega.map((forma)=>(

                            <>
                            <motion.div  onClick={()=>{ setOficina(forma.ofi) }} className={`toggle-option ${oficina == forma.ofi && 'selected'}`}
                            onMouseEnter={() => setHovered(forma.ofi)}
                            onMouseLeave={() => setHovered(false)}
                            ><span>{forma.ofi}</span>

                            <AnimatePresence>
                            {hovered == forma.ofi &&
                                <motion.div className="extra-info"
                                initial={{opacity : 0, y: 30}}
                                exit={{opacity : 0, y: 30}}
                                animate={{opacity : 1, y: 0}}
                                >
                                    <div>
                                        {parse(forma.info)}
                                    </div>
                                </motion.div>
                            }
                            </AnimatePresence>


                            </motion.div>
                            </>
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