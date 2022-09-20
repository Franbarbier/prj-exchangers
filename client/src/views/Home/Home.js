import React, { useState, useEffect, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

import parse from 'html-react-parser';
import CountUp from 'react-countup';

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

  const [counter1, setCounter1] = useState(0)
    

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

  const textAnim = {
    hidden: { transform: "translate3d(0, 5em, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0deg, 25deg)" },
    show: {
      transform: "translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0deg, 0deg)",
    //   transition: {ease: [0.26, 1.03, 0, 1]}
    }
  }


  const ref = useRef()
  const isVisible = useOnScreen(ref)

  function useOnScreen(ref) {

    const [isIntersecting, setIntersecting] = useState(false)
  
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
    )
  
    useEffect(() => {
      observer.observe(ref.current)
      // Remove the observer as soon as the component is unmounted
      return () => { observer.disconnect() }
    }, [])
  
    return isIntersecting
  }


  function counterUno(minimum, maximum)  {
    var cnt = minimum
    var obj1;

    setInterval(function(){
      cnt++;
      obj1 = cnt;
      if(cnt == 5000){
        setCounter1(cnt)
        // clearInterval(timerMy);
        return false
      }

    },0
    );
}


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
                            <div style={{'overflow':'hidden'}}>
                            <motion.h1
                                className="framerAnim"
                                variants={textAnim}
                                initial="hidden"
                                animate="show"
                                transition={{ease: [0.26, 1.03, 0, 1] }}
                            >Tu exchanger de confianza.</motion.h1>
                            </div>
                            <motion.p
                             initial={{ opacity: 0}}
                             animate={{ opacity: 1}}
                             transition={{ delay: 2.5 }}
                             className='framerAnim'
                            >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</motion.p>
                            <a href="#plataformas" className="big-btn"><Boton1 text={'Encontrá tu plataforma'}/></a>
                            <a href="#faq-section" ><button>Preguntas frecuentes</button></a>
                        </header>
                        <div>
                          <div onClick={()=>{ setViewPlatforms(!viewPlatforms) }}>
                            <span>Mirá con las plataformas que trabajamos</span>
                            <motion.div id="mira-plataf"
                              animate={{
                                scale: [0.8, 0.9, 1, 1.05, 1],
                                opacity: [0, 1, 1, 1, 1]
                              }}
                            >
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
                            </motion.div>
                          </div>
                        </div>
                    </main>
                <div className='main-cont'>
                    <div id="steps">
                      <div>
                          <motion.h3
                            initial={{y: 20, opacity: 0}}
                            whileInView={{y: 0, opacity: 1}}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration : 1 }}

                          >Obtené tu dinero en 3 simples pasos</motion.h3>
                          <div id="diagrama">
                              <img src="/assets/diagram.svg" />
                          </div>
                      </div>
                    </div>
                    <div id="plataformas"></div>
                    <div id="plataformas-cont">
                        <motion.h3
                            initial={{y: 20, opacity: 0}}
                            whileInView={{y: 0, opacity: 1}}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration : 1 }}

                          >Dónde tenés tu saldo?</motion.h3>
                        <ul>
                          {plataformas.map((plataforma)=>(
                            <motion.li
                              initial={{y: 20, opacity: 0}}
                              whileInView={{y: 0, opacity: 1}}
                              viewport={{ once: true }}
                              transition={{ duration : 1 }}

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
                            </motion.li>
                          )) 
                          }
                        </ul>
                    </div>
                    <div id="testimonios">
                        <div>
                        <motion.h3
                            initial={{y: 20, opacity: 0}}
                            whileInView={{y: 0, opacity: 1}}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration : 1 }}

                          >Qué dicen nuestros clientes</motion.h3>
                          <div>
                            <div id="numeros">
                              <div ref={ref}>
                                <p>
                                {isVisible &&
                                  <CountUp start={0} end={5000} />
                                }
                                </p>
                                <span>Clientes contentos</span>
                              </div>
                              <div>
                                <p>
                                {isVisible &&
                                  <CountUp start={0} end={300} />
                                }
                                </p>
                                <span>Operacion diarias</span>
                              </div>
                            </div>

                            <div id="notifications">
                                <motion.div
                                  initial={{x: -20, opacity: 0}}
                                  whileInView={{x: 0, opacity: 1}}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.3, duration : 0.5 }}
                                >
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
                                </motion.div>

                                <motion.div
                                  initial={{x: -20, opacity: 0}}
                                  whileInView={{x: 0, opacity: 1}}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.5, duration : 0.5 }}
                                >
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
                                </motion.div>

                                <motion.div
                                  initial={{x: -20, opacity: 0}}
                                  whileInView={{x: 0, opacity: 1}}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.7, duration : 0.5 }}
                                >
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
                                </motion.div>

                                <motion.div
                                  initial={{x: -20, opacity: 0}}
                                  whileInView={{x: 0, opacity: 1}}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.9, duration : 0.5 }}
                                >
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
                                </motion.div>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div id="faq-section">
                          <motion.h3
                            initial={{y: 20, opacity: 0}}
                            whileInView={{y: 0, opacity: 1}}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration :1 }}

                          >Tenés preguntas?</motion.h3>
                        <ul>
                          {faqs.map((faq, index)=>(
                            <motion.li onClick={()=>{setSelectedFaq(index)}}
                                initial={{y: 20, opacity: 0}}
                                whileInView={{y: 0, opacity: 1}}
                                viewport={{ once: true }}
                                transition={{ duration : 1 }}
                            >
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
                            </motion.li>
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