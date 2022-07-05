import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";


import './Panel.css';
import Boton1 from '../../components/Boton1/Boton1';
import InputField from '../../components/InputField/InputField';
import ModalCreatePlataforma from '../../components/ModalCreatePlataforma/ModalCreatePlataforma';

import {deletePlataformas} from '../../actions/plataformas';


const Panel = ({ setActiveTab }) => {
    

    const [modalCreatePlataforma, setModalCreatePlataforma] = useState(false)


    const dispatch = useDispatch()
  useEffect(()=>{
    console.log()
  })

  const plataformas = useSelector(state => state.plataformas) 

  console.log(plataformas)

       
  function render(){
      return  <div id="Panel-view">
                <div className='main-cont'>
                    <div>
                        <h2>Administrar plataformas</h2>
                        <button onClick={()=>(setModalCreatePlataforma(true))}>Agregar plataforma</button>
                    </div>
                    <ul id="actual-platform">
                        {plataformas.map((plat)=>(
                            <li>
                                <div className="img-plat">
                                    <img src={plat.icon_url}/>
                                </div>
                                <div className="nombre-plat">
                                    <h4>{plat.nombre}</h4>
                                </div>
                                <div className="comisiones-plat">
                                    <span>COMISIONES:</span>
                                    {plat.fecha_entrega.map((fecha)=>(
                                        <div>
                                            <span>{Object.keys(fecha)}</span>
                                            <span>:</span>
                                            <span>{Object.values(fecha)}%</span>
                                        </div>
                                        
                                    ))}
                                </div>
                                <div className="config-plat">
                                        <span  onClick={()=>{ deletePlataformas([plat._id], dispatch) }} className="delete-btn">DELETE</span>
                                </div>
                                
                            </li>
                        ))}
                    </ul>
                </div>
                {modalCreatePlataforma &&
                    <ModalCreatePlataforma setModalCreatePlataforma={setModalCreatePlataforma} />
                }
              </div>

       }
       
       
       return ( render() )
}




export default Panel;