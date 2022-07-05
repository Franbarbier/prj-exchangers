import React, { useState, useEffect, useMemo } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { createPlataforma } from '../../actions/plataformas.js'

import './ModalCreatePlataforma.css';


const MenuBar = ({ editor }) => {
    if (!editor) {
      return null
    }
  
    return (
      <>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          italic
        </button>
        
        
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          paragraph
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          h1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          h2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          h3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        >
          h4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
        >
          h5
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        >
          h6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          ordered list
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          blockquote
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          hard break
        </button>
        <button onClick={() => editor.chain().focus().undo().run()}>
          undo
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          redo
        </button>
      </>
    )
  }
const Tiptap = () => {
    const editor = useEditor({
      extensions: [
        StarterKit,
      ],
      content: '<p>Información de la plataforma</p>',
    })
  
    return (
        <>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </>
    )
  }




  const Entregas = ({ setDiasUl, diasUl, dia, indexY,cantEntregas, setCantEntregas }) => {
    const fechasEntrega = ['En el día', '2 días', '3 días', '4 días', '5 días', '6 días']

    const [diaSelected, setDiaSelected] = useState(Object.keys(dia))
    const [cometaSelected, setCometaSelected] = useState(Object.values(dia))

    var indez = 0;
    useEffect(()=>{
        indez = indexY
        console.log(indez)
    }, [])
  
    useEffect(()=>{
        
        setDiasUl(false)

        console.log(cometaSelected)

        let newCantEntregas = cantEntregas
        newCantEntregas[0] = {[diaSelected] : cometaSelected}

        setCantEntregas(newCantEntregas)
        
    }, [diaSelected, cometaSelected])
    

    function cambiarFecha(fecha) {
        // let newCantEntregas = cantEntregas
        // newCantEntregas[indexY] = {[diaSelected] : cometaSelected[0]}
        
        // setDiaSelected(fecha)
        // setCantEntregas(newCantEntregas)
    }

    return (
        <div id={indexY}>
            <div>
                <span onClick={()=>{ setDiasUl(!diasUl) }}>{diaSelected}</span>
                <input onChange={(e)=>{setCometaSelected(e.target.value)}} type="number" value={cometaSelected} placeholder="Comisión"/>%
            </div>
            { diasUl &&
                <ul>
                    {fechasEntrega.map((fecha)=>(
                        <li onClick={ ()=>{setDiaSelected(fecha)} }>{fecha}</li>
                    ))}
                </ul>
            }
        </div>
    )
  }


const ModalCreatePlataforma = ({ setModalCreatePlataforma }) => {
    
    
       // const setTipo = tipo
       const [diasUl, setDiasUl] = useState(false)
       const [nombre, setNombre] = useState('')
       const [cantEntregas, setCantEntregas] = useState([
            { 'En 3 días': 0}
        ])

        // const dispatch = useDispatch()


       useEffect(()=>{
       })


    function handleCreatePlataforma(){

        let descripcion =  document.querySelector('.ProseMirror').innerHTML
        
        let final_platform = {
            nombre : nombre,
            descripcion : descripcion,
            fecha_entrega : cantEntregas
        }
        
        console.log( final_platform )

        createPlataforma({final_platform}).then(
            (e)=> 
            //   console.log(e)
              setModalCreatePlataforma(false)
            //   document.location.reload(true)
            ).catch( (e) =>{
              console.log('error:::', e.error)
     
          } )
    }

       
  function render(){
      return  <div id="ModalCreatePlataforma">
                 <div>
                    <div>
                    <h4>Nueva plataforma</h4>
                    <div>
                        <div>
                            <div>
                                <label>Nombre de la plataforma</label>
                                <input onChange={(e)=>{ setNombre(e.target.value) }} className="plat-name" type="text"/>
                            </div>
                            <div className="diaEntrega">
                                <label>Fechas de entrega</label>
                                <div>
                                    <div className="date-selector">
                                        {cantEntregas.map((dia, index)=>(
                                                <Entregas cantEntregas={cantEntregas} setCantEntregas=  {setCantEntregas} dia={dia} indexY={index} setDiasUl={setDiasUl} diasUl={diasUl} />
                                        ))}
                                    </div>
                                </div>

                                {/* <button onClick={()=>{ setCantEntregas([...cantEntregas, {'En 8 días': 0} ]) }}> */}
                                <button onClick={(e)=>{ e.preventDefault() }}>
                                    <span>+</span>
                                    <p>Agregar otra opción</p>
                                </button>
                            


                            </div>
                            <div id="select-icon">
                                <label>Elegir icono</label>
                                <input disabled type="file" />
                            </div>
                            <div className="descripcion">
                                <label>Descripción</label>
                                
                                <Tiptap />
                            </div>
                        </div>
                    </div>
                    <button id="rene-plat" onClick={()=>{setModalCreatePlataforma(false)}}>Descartar</button>
                    <button id="crear-plat" onClick={ handleCreatePlataforma }>Crear</button>
                    </div>

                 </div>
              </div>

       }
       
       
       return ( render() )
}




export default ModalCreatePlataforma;