import React, { useState, useEffect, useMemo } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";


import { createWpp, updateWpp } from '../../actions/wpps.js'

import './ModalCreateWpp.css';





const ModalCreateWpp = ({ setModalCreateWpp, editWpp=null, setEditWpp }) => {
    
  const [vendedor, setVendedor] = useState(editWpp?.vendedor)
  const [numero, setNumero] = useState(editWpp?.numero)

  const dispatch = useDispatch()

  function handleCreateWpp(){
        let wpp = {
            vendedor : vendedor,
            numero : numero,
        }
        
        console.log( wpp )

        createWpp({wpp}).then(
            (e)=> 
            //   console.log(e)
              setModalCreateWpp(false)
            //   document.location.reload(true)
            ).catch( (e) =>{
              console.log('error:::', e.error)
     
          } )
    }

    function handleEditWpp(){
        let wpp = {
            vendedor : vendedor,
            numero : numero,
            _id : editWpp._id
        }
        
        console.log( wpp )

        updateWpp({wpp}, dispatch).then(
            (e)=> 
            //   console.log(e)
              setModalCreateWpp(false),
              setEditWpp(null)
            //   document.location.reload(true)
            ).catch( (e) =>{
              console.log('error:::', e.error)
     
          } )
    }
       
  function render(){
      return  <div id="ModalCreateWpp">
                 <div>
                    <div>
                    <h4>Nueva línea</h4>
                    <div className="content-flex">
                        <div>
                            <label>Nombre del vendedor</label>
                            <input onChange={ (e)=>{ setVendedor(e.target.value) } } value={vendedor} type="text" />
                        </div>
                        <div>
                            <label>Numero</label>
                            <input onChange={ (e)=>{ setNumero(e.target.value) } } value={numero} type="number" placeholder='5491133334444' defaultValue='54911'/>

                        </div>
                    </div>
                    <button id="rene-plat" onClick={()=>{setModalCreateWpp(false)}}>Descartar</button>

                    {editWpp?
                    <button id="crear-plat" onClick={ handleEditWpp }>Guardar</button>
                    :
                    <button id="crear-plat" onClick={ handleCreateWpp }>Crear</button>
                    }
                    </div>

                 </div>
              </div>

       }
       
       
       return ( render() )
}




export default ModalCreateWpp;