import React, { useState, useEffect, useMemo } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { createFaq, updateFaq } from '../../actions/faqs.js'

import './ModalCreateFaq.css';





const ModalCreateFaq = ({ setModalCreateFaq, editFaq=null, setEditFaq }) => {
    
    
  const [pregunta, setPregunta] = useState(editFaq?.pregunta)
  const [respuesta, setRespuesta] = useState(editFaq?.rta)


  const dispatch = useDispatch()

  function handleCreateFaq(){
        let faq = {
            pregunta : pregunta,
            rta : respuesta,
        }
        
        console.log( faq )

        createFaq({faq}).then(
            (e)=> 
            //   console.log(e)
              setModalCreateFaq(false)
            //   document.location.reload(true)
            ).catch( (e) =>{
              console.log('error:::', e.error)
     
          } )
    }

    function handleEditFaq(){
        let faq = {
            pregunta : pregunta,
            rta : respuesta,
            _id : editFaq._id
        }
        
        console.log( faq )

        updateFaq({faq}, dispatch).then(
            (e)=> 
            //   console.log(e)
              setModalCreateFaq(false),
              setEditFaq(null)
            //   document.location.reload(true)
            ).catch( (e) =>{
              console.log('error:::', e.error)
     
          } )
    }
       
  function render(){
      return  <div id="ModalCreateFaq">
                 <div>
                    <div>
                    <h4>Nueva FAQ</h4>
                    <div>
                        <div>
                            <label>Pregunta</label>
                            <textarea row="2" className="plat-name"  value={pregunta} onChange={(e)=>{ setPregunta(e.target.value) }} >
                            </textarea>
                        </div>
                        <div>
                            <label>Respuesta</label>
                            <textarea row="3" className="plat-name"  value={respuesta} onChange={(e)=>{ setRespuesta(e.target.value) }} >
                            </textarea>
                        </div>
                    </div>
                    <button id="rene-plat" onClick={()=>{setModalCreateFaq(false)}}>Descartar</button>

                    {editFaq?
                    <button id="crear-plat" onClick={ handleEditFaq }>Guardar</button>
                    :
                    <button id="crear-plat" onClick={ handleCreateFaq }>Crear</button>
                    }
                    </div>

                 </div>
              </div>

       }
       
       
       return ( render() )
}




export default ModalCreateFaq;