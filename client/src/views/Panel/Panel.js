import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";


import './Panel.css';
import Boton1 from '../../components/Boton1/Boton1';
import InputField from '../../components/InputField/InputField';
import ModalCreatePlataforma from '../../components/ModalCreatePlataforma/ModalCreatePlataforma';

import {deletePlataformas} from '../../actions/plataformas';
import ModalCreateFaq from '../../components/ModalCreateFaq/ModalCreateFaq';
import { deleteFaqs } from '../../actions/faqs';
import { ENDPOINT } from '../../global';


const Panel = ({ setActiveTab }) => {
    

    const [modalCreatePlataforma, setModalCreatePlataforma] = useState(false)
    const [modalCreateFaq, setModalCreateFaq] = useState(false)
    const [editPlat, setEditPlat] = useState(null)
    const [editFaq, setEditFaq] = useState(null)


    const dispatch = useDispatch()
  useEffect(()=>{
    console.log()
  })

  const plataformas = useSelector(state => state.plataformas) 
  const faqs = useSelector(state => state.faqs) 

  console.log(plataformas, faqs)

  function handleEditPlat(plat) {
    setModalCreatePlataforma(true)
    setEditPlat(plat)
  }


  function handleEditFaq(faq) {
    setModalCreateFaq(true)
    setEditFaq(faq)
  }
       
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
                                    <img src={`${ENDPOINT}iconos/${plat.icon_url}`} />

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
                                        {/* <span  className="delete-btn">DELETE</span> */}
                                        <div className='delete-faq'>
                                            <img  onClick={()=>{ deletePlataformas([plat._id], dispatch) }} width="24px" src="/assets/delete.png"/>
                                        </div>
                                        <div className='edit-faq'>
                                            <img onClick={()=> {handleEditPlat(plat)}} width="22px" src="/assets/editar.png"/>
                                        </div>
                                </div>
                                
                            </li>
                        ))}
                    </ul>

                    <div id="faq-tit">
                        <h2>Editar FAQs</h2>
                        <button onClick={()=>(setModalCreateFaq(true))} >Agregar FAQ</button>
                    </div>
                    <ul id="faqs">
                        {faqs.map((faq)=>(
                            <li>
                                <div className='data-faq'>
                                    <p className='preg'><b>{faq.pregunta}</b></p>
                                    <p className='resp'>{faq.rta}</p>
                                </div>
                                <div className='edit-faq' onClick={()=> {handleEditFaq(faq)}}>
                                    <img width="22px" src="/assets/editar.png"/>
                                </div>
                                <div  onClick={()=>{ deleteFaqs([faq._id], dispatch) }} className='delete-faq'>
                                    <img width="24px" src="/assets/delete.png"/>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {modalCreateFaq &&
                    <ModalCreateFaq editFaq={editFaq} setEditFaq={setEditFaq} setModalCreateFaq={setModalCreateFaq} />
                }
                {modalCreatePlataforma &&
                    <ModalCreatePlataforma editPlat={editPlat} setEditPlat={setEditPlat} setModalCreatePlataforma={setModalCreatePlataforma} />
                }
              </div>

       }
       
       
       return ( render() )
}




export default Panel;