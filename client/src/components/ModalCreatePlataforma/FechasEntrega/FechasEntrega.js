import React, { useState, useEffect, useMemo } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";






  const Entregas = ({ setDiasUl, diasUl, dia, indexY,cantEntregas, setCantEntregas, deleteForma }) => {
    const fechasEntrega = ['En el día', '2 días', '3 días', '4 días', '5 días', '6 días']

    const [diaSelected, setDiaSelected] = useState(Object.keys(dia)[0])
    const [cometaSelected, setCometaSelected] = useState(Object.values(dia)[0])
    const [id_elegido, setId_elegido] = useState(indexY)

    // console.log(Object.keys(dia)[0])
    // console.log(Object.values(dia)[0])
    console.log(dia)
    // useEffect(()=>{
    //     setDiasUl(false)
    //     let newCantEntregas = cantEntregas
    //     newCantEntregas[0] = {[diaSelected] : Number(cometaSelected)}
        
    //     setCantEntregas(newCantEntregas)
        
    // }, [])
    useEffect(()=>{
      let newCantEntregas = cantEntregas
      newCantEntregas[indexY] = {[diaSelected] : Number(cometaSelected)}
      
      setCantEntregas(newCantEntregas)
      
    }, [diaSelected, cometaSelected])

    useEffect(()=>{
      console.log(cantEntregas)
      console.log(cometaSelected)
    })


    function deleteForma() {
      // let newCantEntregas = cantEntregas
      //ne wCantEntregas.splice(indexY,1)
      // console.log(cantEntregas, newCantEntregas)

      let left = cantEntregas.slice(0, indexY);   // Everything before configs[index]
      let right = cantEntregas.slice(indexY + 1); // Everything after configs[index]
      var newCant = [...left, ...right]


      setCantEntregas(newCant)
      
    }

    return (
        <div id={indexY} key={indexY}>
            <div>
                <span onClick={()=>{ setDiasUl(indexY) }}>{diaSelected}</span>
                <input onChange={(e)=>{setCometaSelected(e.target.value)}} type="number" value={cometaSelected} placeholder="Comisión"/>%
                <div
                    onClick={()=>{
                      deleteForma(indexY)
                    }}
                    className="deleteEntrega">
                  <img src="/assets/delete.png" />
                </div>
            </div>
            { diasUl === indexY  && 
                <ul>
                    {fechasEntrega.map((fecha, index)=>(
                        <li 
                        id={`opt${indexY}`}
                        key={index}
                        onClick={ (e)=>{
                              setDiasUl(false)
                              setDiaSelected(fecha)
                        } }>{fecha}</li>
                    ))}
                </ul>
            }
        </div>
    )
  }

  export default Entregas;
