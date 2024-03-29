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
    const [linea, setLinea] = useState()
    const [vendedor, setVendedor] = useState()
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


  
    useEffect(()=>{
        var mySubString = window.location.href.substring(
            window.location.href.indexOf("?") + 1, 
            window.location.href.lastIndexOf("&")
        );
        
        console.log(mySubString)
        if(mySubString != ''){
            setVendedor(mySubString)
        }else{
            setVendedor('PRJ')
        }


        if(window.location.href.split('&')[1] != '' && window.location.href.split('&')[1] ){
            setLinea(window.location.href.split('&')[1])
        }else{
            setLinea('5492944485981')
        }
    }, [])

    useEffect(()=>{
        setDataOpereta({...dataOpereta, oficina: oficina})
    }, [oficina])

    function checkCuantoDias(dias) {
        console.log(dias)
        var matches = dias[0].replace(/\D/g,'')
        var date = 0;
        if ( matches != '') {
            date = Number(matches)
        }
        console.log(date)
        var outputDate =  new Date( new Date().setDate(new Date().getDate() + date))
        if (outputDate.getDay() == 6) {
            outputDate = new Date( outputDate.setDate(outputDate.getDate() + 1)) 
        }
        if (outputDate.getDay() == 0) {
              outputDate = new Date( outputDate.setDate(outputDate.getDate() + 1)) 
        }

        let formatDate = new Date(outputDate).getDate()  + "/" + (new Date(outputDate).getMonth()+1) + "/" + new Date(outputDate).getFullYear()

        return formatDate
    }
       
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

                    <div className="InputField">
                        <label>Agregar obsevación: </label>                        
                        <textarea rows={3} type="text" onChange={ (e)=>{ setDataOpereta({...dataOpereta, observacion: e.target.value}) }}  />
                    </div>
        
                    <div>
                        <a onClick={ ()=> {setOpenCheckout(false)} }>
                            <Boton1 text={"Volver"} />
                        </a>
                        {/* <Link
                            
                            to={`https://wa.me/${linea}?text=*Nombre:*%20${dataOpereta.nombre}%0a%0a*Quién retira:*%20${dataOpereta.retira}%0a%0a*Oficina:*%20${dataOpereta.oficina}%0a%0a*Plataforma:*%20${dataOpereta.platform}%0a%0a*Día:*%20${Object.values(dataOpereta.fecha)[0]}%0a%0a*Monto a enviar:*%20${dataOpereta.monto_a_enviar}%0a%0a*Monto a recibir:*%20${dataOpereta.monto_a_recibir}`} >
                            Confirmar Operación
                        </Link> */}
                        <a
                            onClick={ ()=> window.open(`https://wa.me/${linea}?text=Hola ${vendedor}! Quería realizar la siguiente operación:%0a%0a%0a*Nombre:*%20${dataOpereta.nombre}%0a%0a*Oficina:*%20${dataOpereta.oficina}%0a%0a*Plataforma:*%20${dataOpereta.platform}%0a%0a*Día:*%20${checkCuantoDias(Object.keys(dataOpereta.fecha)[0])}%0a%0a*Monto a enviar:*%20${dataOpereta.monto_a_enviar}%0a%0a*Monto a recibir:*%20${dataOpereta.monto_a_recibir}%0a%0a*Observación:*%20${dataOpereta.observacion && dataOpereta.observacion }`, '_blank').focus() }

                        >
                            {console.log(dataOpereta.fecha)}
                            <Boton1 text={"Confirmar operación"} /> 
                         </a>

                    </div>
                 
                </div>
              </div>

       }
       
       
       return ( render() )
}




export default Checkout;