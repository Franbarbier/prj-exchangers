import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

import parse from 'html-react-parser';

import './Home.css';
import Boton1 from '../../components/Boton1/Boton1';
import InputField from '../../components/InputField/InputField';
import Calculadora from '../../components/Calculadora/Calculadora';
import Checkout from '../../components/Checkout/Checkout';
import { ENDPOINT } from '../../global';


const Home = ({ setActiveTab }) => {
  
  
  const [viewPlatforms, setViewPlatforms] = useState(false)
  const [selectedFaq, setSelectedFaq] = useState(false)
  
  const [dataOpereta, setDataOpereta] = useState({})

  const [openCheckout, setOpenCheckout] = useState(false)

  const [platformData, setPlatformData] = useState({descripcion: '<div></div>'})
    

  const [recibir, setRecibir] = useState(0)
  const [enviar, setEnviar] = useState(0)

  useEffect(()=>{
    console.log(dataOpereta)
  }, [dataOpereta])

  useEffect(()=>{

    setTimeout(() => {
      setDataOpereta({...dataOpereta, platform : platformData?.nombre})
    }, 200);


    // const child = ConvertStringToHTML(platformData?.descripcion);
    // document.querySelector('#plat-info').appendChild(child);
    // console.log(platformData)
    
  }, [platformData]) 
  

 
  
  useEffect(()=>{

    if (openCheckout) {
      console.log(document.getElementsByTagName('body')[0])
      document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
    }else{
      document.getElementsByTagName('body')[0].style.overflowY = 'auto'
    }
    
    
  }, [openCheckout])
  
  
  useEffect(()=>{
    console.log(selectedFaq)
    
  }, [selectedFaq])


  const plataformas = useSelector(state => state.plataformas)
  const faqs = useSelector(state => state.faqs) 



       
  function render(){
      return  <div id="Home-view">
          <nav id="navv">
            <div>
              <div>
                <img src="/assets/logo-l.png"/>
              </div>
              <ul>
                <li><a href="#faq-section">preguntas frecuentes</a></li>
                <li><a href="#plataformas">plataformas</a></li>
              </ul>
            </div>
          </nav>
                    <main>
                        <header>
                            <h1>Tu exchanger de confianza.</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                            <a href="#plataformas" className="big-btn"><Boton1 text={'Encontrá tu plataforma'}/></a>
                            <a href="#faq-section" ><button>Preguntas frecuentes</button></a>
                        </header>
                        <div>
                          <div onClick={()=>{ setViewPlatforms(!viewPlatforms) }}>
                            <span>Mirá con las plataformas que trabajamos</span>
                            <div id="mira-plataf">
                              <div >
                                <div>
                                  <div>
                                    <img src={`https://storage.googleapis.com/prj-calculadora/iconos/${plataformas[0]?.icon_url}`} />
                                  </div>
                                  <h3>{plataformas[0]?.nombre}</h3>
                                </div>

                                <div>
                                  <img style={{'opacity':'0.8'}} src="/assets/abajo.png" />
                                </div>
                              </div>
                              {viewPlatforms &&

                              <ul>
                                  {plataformas?.map((plataforma)=>(
                                    <li>
                                      <a 
                                      // href={`#${plataforma.nombre}`}
                                        onClick={()=>{
                                          let julie = document.getElementById(plataforma.nombre)
                                          julie.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                            inline: "center"
                                          });
                                        }}
                                      >
                                      <div>
                                        <img src={`https://storage.googleapis.com/prj-calculadora/iconos/${plataforma?.icon_url}`} />

                                        <p>{plataforma.nombre}</p>
                                      </div>
                                      <button>Ver más</button>

                                      </a>
                                    </li>
                                  ))}
                              </ul>
                              }
                            </div>
                          </div>
                        </div>
                    </main>
                <div className='main-cont'>
                    <div id="steps">
                      <div>
                          <h3>Obtené tu dinero en 3 simples pasos</h3>
                          <div id="diagrama">
                              <img src="/assets/diagram.svg" />
                          </div>
                      </div>
                    </div>
                    <div id="plataformas"></div>
                    <div id="plataformas-cont">
                        <h3>Dónde tenés tu saldo?</h3>
                        <ul>
                          {plataformas.map((plataforma)=>(
                            <li
                              id={plataforma.nombre}
                              className={ plataforma.nombre == platformData?.nombre && "plat-selected"} 
                              onClick={ ()=>{ 
                                setPlatformData(plataforma.nombre)
                                setPlatformData(plataforma)  
                              } } >
                              <div className="plataf-name">
                                <div>
                                   <img className='plataf-icon' src={`https://storage.googleapis.com/prj-calculadora/iconos/${plataforma?.icon_url}`} />
                                  <h4>
                                    {plataforma.nombre}
                                  </h4>
                                </div>
                                <img 
                                  onClick={ (e)=>{ 
                                    if(plataforma.nombre === platformData?.nombre) {
                                        e.stopPropagation()
                                        setPlatformData(false)
                                        setOpenCheckout(false)
                                     }
                                  } } 
                                  src="/assets/mas.png" />

                              </div>
                              { plataforma.nombre == platformData?.nombre &&
                                <div id='plat-info'>
                                  {/* <p>{plataforma.descripcion}</p> */}
                                  <div>
                                    {parse(plataforma.descripcion)}
                                    
                                  </div>
                                  <hr />
                                  <div className="calculadora-cont">
                                    <h6>Calculá tu monto</h6>
                                    <Calculadora
                                      platformData={platformData} 
                                      dataOpereta={dataOpereta} 
                                      setDataOpereta={setDataOpereta} 
                                      setRecibir={setRecibir} 
                                      setEnviar={setEnviar} 
                                      enviar={enviar}
                                      recibir={recibir}
                                      type="number" 
                                      divisa='usd' 
                                      plataforma={plataforma.nombre} 
                                    />
                                    <div href={`#${plataforma.nombre}`} onClick={ ()=>{ 
                                        setOpenCheckout(true)
                                        let julie = document.getElementById(plataforma.nombre)
                                        julie.scrollIntoView({
                                          behavior: "smooth",
                                          block: "center",
                                          inline: "center"
                                        });

                                      } } >
                                      <Boton1 text="Operar con esta plataforma" />
                                    </div>
                                  </div>

                                  {openCheckout &&
                                    <>
                                      <motion.div
                                      style={{
                                          'height': '100vh',
                                          'width': '100vw',
                                          'position': 'fixed',
                                          'top': '0',
                                          'left': '0',
                                          'backgroundColor': '#ddd',
                                          'zIndex': '4'
                                        }}
                                        initial={{ y: "100vh"}}
                                        animate={{ y: 0 }}
                                        exit={{ y: "100vh"}}
                                        transition={{ duration: 0.7 }}
                                        />

                                        <motion.div
                                        style={{
                                          'height': '100vh',
                                          'width': '100vw',
                                          'position': 'fixed',
                                          'top': '0',
                                          'left': '0',
                                          'zIndex': '5'
                                        }}
                                          initial={{ y: "100vh"}}
                                          animate={{ y: 0 }}
                                          exit={{ y: "100vh"}}
                                          transition={{ duration: 0.7, delay: 0.5}}
                                        >
                                        <Checkout
                                            plataforma={plataforma}
                                           platformData={platformData} 
                                           dataOpereta={dataOpereta} 
                                           setDataOpereta={setDataOpereta} 
                                           setRecibir={setRecibir} 
                                           setEnviar={setEnviar} 
                                           setOpenCheckout={setOpenCheckout}
                                           setPlatformData={setPlatformData}
                                          /> 
                                        </motion.div>
                                        
                                  
                                 </>
                                  }

                                </div>
                              }
                            </li>
                          )) 
                          }
                        </ul>
                    </div>
                    <div id="testimonios">
                        <div>
                          <h3>Qué dicen nuestros clientes</h3>
                          <div>
                            <div id="numeros">
                              <div>
                                <p>5.000</p>
                                <span>Clientes contentos</span>
                              </div>
                              <div>
                                <p>300</p>
                                <span>Operacion diarias</span>
                              </div>
                            </div>

                            <div id="notifications">
                                <div>
                                  <div>
                                    <div className='notif-img'>
                                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Jos%C3%A9_Larralde_Quilmes.jpg"/>
                                    </div>
                                    <div className='notif-info'>
                                      <p>Jose Larralde</p>
                                      <span>La verdad es que me cambio la vida conocerlos, que pim que pam tuqui liso paradiso.</span>
                                    </div>
                                    <span>2 days ago</span>
                                  </div>
                                </div>

                                <div>
                                  <div>
                                    <div className='notif-img'>
                                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Jos%C3%A9_Larralde_Quilmes.jpg"/>
                                    </div>
                                    <div className='notif-info'>
                                      <p>Jose Larralde</p>
                                      <span>La verdad es que me cambio la vida conocerlos, que pim que pam tuqui liso paradiso.</span>
                                    </div>
                                    <span>2 days ago</span>
                                  </div>
                                </div>

                                <div>
                                  <div>
                                    <div className='notif-img'>
                                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Jos%C3%A9_Larralde_Quilmes.jpg"/>
                                    </div>
                                    <div className='notif-info'>
                                      <p>Jose Larralde</p>
                                      <span>La verdad es que me cambio la vida conocerlos, que pim que pam tuqui liso paradiso.</span>
                                    </div>
                                    <span>2 days ago</span>
                                  </div>
                                </div>

                                <div>
                                  <div>
                                    <div className='notif-img'>
                                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Jos%C3%A9_Larralde_Quilmes.jpg"/>
                                    </div>
                                    <div className='notif-info'>
                                      <p>Jose Larralde</p>
                                      <span>La verdad es que me cambio la vida conocerlos, que pim que pam tuqui liso paradiso.</span>
                                    </div>
                                    <span>2 days ago</span>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div id="faq-section">
                        <h3>Tenés preguntas?</h3>
                        <ul>
                          {faqs.map((faq, index)=>(
                            <li onClick={()=>{setSelectedFaq(index)}}>
                              <div className="pregunta-cont">
                                <div className="icon-preg">
                                  <div className={selectedFaq == index && "abiertus"} ></div>
                                  <div></div>
                                </div>
                                <h6>{faq.pregunta}</h6>
                              </div>
                                { selectedFaq == index &&
                                  <motion.div className="rta"
                                    initial={{y : -20, opacity:0}}
                                    animate={{y : 0, opacity:1}}
                                    transition={{ duration : 0.7 }}
                                  >
                                      <p>{faq.rta}</p>
                                  </motion.div>
                                }
                            </li>
                          ))

                          }
                         
                        </ul>

                    </div>
                </div>  
              </div>

       }
       
       
       return ( render() )
}




export default Home;