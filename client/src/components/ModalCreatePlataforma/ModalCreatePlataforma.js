import React, { useState, useEffect, useMemo } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { createPlataforma, updatePlataforma, uploadIcon } from '../../actions/plataformas.js'

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


const ModalCreatePlataforma = ({ setModalCreatePlataforma, editPlat=null, setEditPlat }) => {
    
    
       // const setTipo = tipo
       const [diasUl, setDiasUl] = useState(false)
       const [nombre, setNombre] = useState(editPlat?.nombre)
       const [cantEntregas, setCantEntregas] = useState( editPlat ? editPlat.fecha_entrega : [ { 'En 3 días': 0 } ] )

       const dispatch = useDispatch()

       const [image, setImage] = useState(false)
       const [file, setFile] = useState();
        const [fileName, setFileName] = useState("");
  
        const handleFileChange = (e) => {
          setFile(e.target.files[0]);
          setFileName(e.target.files[0].name);
        };
       

    function handleCreatePlataforma(){

        let descripcion =  document.querySelector('.ProseMirror').innerHTML
        
        const formData = new FormData();
        formData.append("fileName", fileName);
        
        formData.append("file", file);
        
        let final_platform = {
          nombre : nombre,
          descripcion : descripcion,
          // archivo: formData,
          icon_url : fileName,
          fecha_entrega : cantEntregas
        }
        console.log( final_platform )

        uploadIcon(formData).then(
          (e)=> 
            console.log(e)
          ).catch( (e) =>{
            console.log('error:::', e.error)
            alert('Hubo un error al subir el icono de la plataforma :(')
            return false;
        } )

        createPlataforma(final_platform, dispatch).then(
            (e)=> 
              // console.log(e),
              setModalCreatePlataforma(false)
            //   document.location.reload(true)
            ).catch( (e) =>{
              console.log('error:::', e.error)
     
          } )
    }


    function handleEditPlataforma(){

      let descripcion =  document.querySelector('.ProseMirror').innerHTML
      
      let edited_platform = {
          nombre : nombre,
          descripcion : descripcion,
          fecha_entrega : cantEntregas,
          archivo: image,
          _id : editPlat._id
      }
      

      updatePlataforma({edited_platform}, dispatch).then(
          (e)=> 
          //   console.log(e)
            setModalCreatePlataforma(false),
            setEditPlat(null)
          //   document.location.reload(true)
          ).catch( (e) =>{
            console.log('error:::', e.error)
   
        } )
    }

    useEffect(()=>{
      console.log(image)
    },[image])

    // const handleFileChange = (e) => {
    //   const img = {
    //     preview: URL.createObjectURL(e.target.files[0]),
    //     data: e.target.files[0],
    //     fileName: e.target.files[0].name
    //   }
    //   setImage(img)
    // }

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
                                <button onClick={(e)=>{ e.preventDefault() }}>
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
                      <button id="edit-plat" onClick={ handleEditPlataforma }>Guardar</button>
                    :
                      <button id="crear-plat" onClick={ handleCreatePlataforma }>Crear</button>
                    }
                    </div>

                 </div>
              </div>

       }
       
       
       return ( render() )
}




export default ModalCreatePlataforma;