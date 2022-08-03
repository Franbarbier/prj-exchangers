import React, { useState, useEffect, useMemo } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { createPlataforma, updatePlataforma, uploadIcon } from '../../actions/plataformas.js'

import './ModalCreatePlataforma.css';
import Entregas from './FechasEntrega/FechasEntrega.js';


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
const Tiptap = ({editPlat}) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
      ],
      content: editPlat ? editPlat.descripcion : '<p>Información de la plataforma</p>',
    })
  
    return (
        <>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </>
    )
  }






const ModalCreatePlataforma = ({ setModalCreatePlataforma, editPlat=null, setEditPlat }) => {
    
    
       // const setTipo = tipo
       const [diasUl, setDiasUl] = useState(false)
       const [nombre, setNombre] = useState(editPlat?.nombre)
       const [cantEntregas, setCantEntregas] = useState( editPlat ? editPlat.fecha_entrega : [ { '3 días': 0 } ] )

       const [guardando, setGuardando] = useState(false)

       const dispatch = useDispatch()

       const [image, setImage] = useState(false)
       const [file, setFile] = useState();
       const [fileName, setFileName] = useState("");
  
       useEffect(()=>{
        setFileName(editPlat?.icon_url)
      },[])

        const handleFileChange = (e) => {
          setFile(e.target.files[0]);
          setFileName(e.target.files[0].name);
        };
       

    function handleCreatePlataforma(){

        let descripcion =  document.querySelector('.ProseMirror').innerHTML
        
        const formData = new FormData();
        formData.append("fileName", fileName);
        
        formData.append("file", file);
        
        var newFileName;
        if (fileName || fileName != "") {
          newFileName = fileName
        }else{
          newFileName = 'logo-chico.png'
        }

        let final_platform = {
          nombre : nombre,
          descripcion : descripcion,
          // archivo: formData,
          icon_url : newFileName,
          fecha_entrega : cantEntregas
        }
        console.log( final_platform )

        setGuardando(true)
        uploadIcon(formData).then(
          (e)=> 
            console.log(e),
            setTimeout(() => {
              createPlataforma(final_platform, dispatch).then(
                  (e)=> 
                    // console.log(e),
                setGuardando(false),
                setModalCreatePlataforma(false)
              //   document.location.reload(true)
              ).catch( (e) =>{
                console.log('error:::', e.error)
       
            } )
              }, 200)


          ).catch( (e) =>{
            console.log('error:::', e.error)
            alert('Hubo un error al subir el icono de la plataforma :(')
            return false;
        } )

        // createPlataforma(final_platform, dispatch).then(
        //     (e)=> 
        //       // console.log(e),
        //       setModalCreatePlataforma(false)
        //     //   document.location.reload(true)
        //     ).catch( (e) =>{
        //       console.log('error:::', e.error)
     
        //   } )
    }


    function handleEditPlataforma(){

      let descripcion =  document.querySelector('.ProseMirror').innerHTML
      
      

      let edited_platform = {
          nombre : nombre,
          descripcion : descripcion,
          fecha_entrega : cantEntregas,
          archivo: image,
          icon_url : fileName,
          _id : editPlat._id
      }

      const formData = new FormData();
        formData.append("fileName", fileName);
        
        formData.append("file", file);
      
      uploadIcon(formData).then(
        (e)=> 
          console.log(e),
          setTimeout(() => {
            updatePlataforma({edited_platform}, dispatch).then(
              (e)=> 
              // console.log(e),
              setGuardando(false),
              setModalCreatePlataforma(false)
              //   document.location.reload(true)
              ).catch( (e) =>{
                console.log('error:::', e.error)
                
              } )
              
            }, 200)

        ).catch( (e) =>{
          console.log('error:::', e.error)
          alert('Hubo un error al subir el icono de la plataforma :(')
          return false;
      } )

      // updatePlataforma({edited_platform}, dispatch).then(
      //     (e)=> 
      //     //   console.log(e)
      //       setModalCreatePlataforma(false),
      //       setEditPlat(null)
      //     //   document.location.reload(true)
      //     ).catch( (e) =>{
      //       console.log('error:::', e.error)
   
      //   } )
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
                                <input onChange={(e)=>{ setNombre(e.target.value) }} value={nombre} className="plat-name" type="text"/>
                            </div>
                            <div className="diaEntrega">
                                <label>Fechas de entrega</label>
                                {editPlat ?
                                <div>
                                    <div className="date-selector">
                                        {editPlat.fecha_entrega.map((dia, index)=>(
                                          <Entregas editEntregas={dia.fecha_entrega} cantEntregas={cantEntregas} setCantEntregas={setCantEntregas} dia={dia} indexY={index} setDiasUl={setDiasUl} diasUl={diasUl} />
                                          ))}
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="date-selector">
                                        {cantEntregas.map((dia, index)=>(
                                          <Entregas cantEntregas={cantEntregas} setCantEntregas={setCantEntregas} dia={dia} indexY={index} setDiasUl={setDiasUl} diasUl={diasUl} />
                                          ))}
                                    </div>
                                </div>
                                }

                                {/* <button onClick={()=>{ setCantEntregas([...cantEntregas, {'En 8 días': 0} ]) }}> */}
                                <button onClick={(e)=>{
                                            setCantEntregas([...cantEntregas, {'3 días': 0} ])
                                            e.preventDefault()
                                          }}>
                                    <span>+</span>
                                    <p>Agregar otra opción</p>
                                </button>
                            


                            </div>
                            <div id="select-icon">
                                <label>Elegir icono</label>
                                <input onChange={(e)=>{ handleFileChange(e) }} type="file" />
                                <br />
                                <img src={image.preview} width="64px" />
                            </div>
                            <div className="descripcion">
                                <label>Descripción</label>
                                
                                <Tiptap editPlat={editPlat}/>
                            </div>
                        </div>
                    </div>
                    <button id="rene-plat" onClick={()=>{
                                              setModalCreatePlataforma(false)
                                              setEditPlat(null)
                                          }}>Descartar</button>
                    {editPlat ? 
                      <button id="edit-plat" onClick={ handleEditPlataforma }>{guardando ? "Guardando" : "Guardar" }</button>
                    :
                      <button id="crear-plat" onClick={ handleCreatePlataforma }>{guardando ? "Guardando" : "Crear" }</button>
                    }
                    </div>

                 </div>
              </div>

       }
       
       
       return ( render() )
}




export default ModalCreatePlataforma;