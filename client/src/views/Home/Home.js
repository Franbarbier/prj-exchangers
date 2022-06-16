import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";


import './Home.css';
import Boton1 from '../../components/Boton1/Boton1';
import InputField from '../../components/InputField/InputField';
import Calculadora from '../../components/Calculadora/Calculadora';
import Checkout from '../../components/Checkout/Checkout';


const Home = ({ setActiveTab }) => {
    

  const [viewPlatforms, setViewPlatforms] = useState(false)
  const [platformSelected, setPlatformSelected] = useState()
  
  const [dataOpereta, setDataOpereta] = useState({})

  const [openCheckout, setOpenCheckout] = useState(false)
  useEffect(()=>{

    setTimeout(() => {
      setDataOpereta({...dataOpereta, platform : platformSelected})
    }, 200);

  }, [platformSelected])
  
  useEffect(()=>{

    if (openCheckout) {
      console.log(document.getElementsByTagName('body')[0])
      document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
    }else{
      document.getElementsByTagName('body')[0].style.overflowY = 'auto'
    }

  }, [openCheckout])

  useEffect(()=>{
    console.log(dataOpereta)
    
  })
  const bbdd = [
    {
      nombre: 'Payoneer',
      icon: '',
      descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s.',
      comision: ''
    },
    {
      nombre: 'Wise',
      icon: '',
      descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s.',
      comision: ''
    },
    {
      nombre: 'Banco',
      icon: '',
      descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s.',
      comision: ''
    },
    {
      nombre: 'Deel',
      icon: '',
      descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s.',
      comision: ''
    },
    {
      nombre: 'Hiperwallet',
      icon: '',
      descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
      comision: ''
    }
    ,
    {
      nombre: 'Zelle',
      icon: '',
      descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
      comision: ''
    },
    {
      nombre: 'Cripto',
      icon: '',
      descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indust standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
      comision: ''
    }
  ]


       
  function render(){
      return  <div id="Home-view">
                <div className='main-cont'>
                    <main>
                        <header>
                            <h1>Tu exchanger de confianza.</h1>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                            <Boton1 text={'Elegí tu cuenta'}/>
                            <button>Preguntas frecuentes</button>
                        </header>
                        <div>
                          <div onClick={()=>{ setViewPlatforms(!viewPlatforms) }}>
                            <span>Mirá con las plataformas que trabajamos</span>
                            <div id="mira-plataf">
                              <div >
                                <div>
                                  <div>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Simple_icon_time.svg/2560px-Simple_icon_time.svg.png" />
                                  </div>
                                  <h3>Payoneer</h3>
                                </div>

                                <div>
                                  <img style={{'opacity':'0.8'}} src="/assets/abajo.png" />
                                </div>
                              </div>
                              {viewPlatforms &&

                              <ul>
                                  {bbdd.map((plataforma)=>(
                                    <li>
                                      <a>
                                      <div>
                                        <img src={`/assets/icons/${plataforma.icon}`} />
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
                    <div id="steps">
                      <div>
                        <div>
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Simple_icon_time.svg/2560px-Simple_icon_time.svg.png" />
                        </div>
                        <p>Selecciona desde que plataforma envias el dinero.</p>
                      </div>
                      <div>
                        <div>
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Simple_icon_time.svg/2560px-Simple_icon_time.svg.png" />
                        </div>
                        <p>Calcula el monto y seleccioná por donde retiras.</p>
                      </div>
                      <div>
                        <div>
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Simple_icon_time.svg/2560px-Simple_icon_time.svg.png" />
                        </div>
                        <p>Pasá a retirar tu dinero por la oficina elegida :D.</p>
                      </div>

                    </div>
                    <div id="plataformas-cont">
                        <h3>Dónde tenés tu saldo</h3>
                        <ul>
                          {bbdd.map((plataforma)=>(
                            <li
                              id={plataforma.nombre}
                              className={ plataforma.nombre == platformSelected && "plat-selected"} 
                              onClick={ ()=>{ setPlatformSelected(plataforma.nombre) } } >
                              <div className="plataf-name">
                                <div>
                                  <img className='plataf-icon' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Simple_icon_time.svg/2560px-Simple_icon_time.svg.png" />
                                  <h4>
                                    {plataforma.nombre}
                                  </h4>
                                </div>
                                <img 
                                  onClick={ (e)=>{ 
                                    if(plataforma.nombre == platformSelected) {
                                        e.stopPropagation()
                                        setPlatformSelected(null)
                                        setOpenCheckout(false)
                                     }
                                  } } 
                                  src="/assets/mas.png" />

                              </div>
                              { plataforma.nombre == platformSelected &&
                                <div className='plat-info'>
                                  {/* <p>{plataforma.descripcion}</p> */}
                                  <p>
                                  La operación tiene dos modalidades y el monto mínimo de operación es de 1000 USD:
                                  <br/><br/>
                                  Modalidad 1:<br/>
                                  El dinero se entrega el dinero el mismo dia que realizas la transferencia a la cuenta, con un costo final del 8%.<br/>
                                  1 USD de Payoneer = 0,92 USD<br/><br/>
                                  Modalidad 2:<br/>
                                  El dinero se entrega al tercer día hábil de realizada la transferencia a la cuenta, con un costo final del 7%.<br/>
                                  1 USD de Payoneer = 0,93 USD<br/><br/>
                                  Pueden optar por recibir una parte en USD y otra en ARS depositados o entregados en mano billete físico (en el caso de los USD solo trabajamos las últimas dos series cara grande).<br/><br/>
                                  Por favor, poner como motivo y referencia de pago lo que indica en el instructivo PDF que le enviaremos al finalizar su orden pedido.<br/>
                                  Una vez que nos envíes el comprobante de transferencia por wpp, se confirma la operación.
                                  </p>
                                  <hr />
                                  <div className="calculadora-cont">
                                    <h6>Simulador de calculadora</h6>
                                    <Calculadora dataOpereta={dataOpereta} setDataOpereta={setDataOpereta} type="number" cometa={5} divisa='usd' plataforma={plataforma.nombre} />
                                    <a href={`#${plataforma.nombre}`} onClick={ ()=>{ setOpenCheckout(true) } } >
                                      <Boton1 text="Operar con esta plataforma" />
                                    </a>
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
                                          setOpenCheckout={setOpenCheckout}
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
                    <div id="faq-section">
                        <h3>Tenés preguntas?</h3>
                        <ul>
                          <li>
                            <div>
                              <div className="icon-preg">
                                <div></div>
                                <div></div>
                              </div>
                              <h6>En cuánto tengo mi dinero despues de mandarlo?</h6>
                            </div>
                            <div className="rta">
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                            </div>
                          </li>
                        </ul>

                    </div>
                </div>  
              </div>

       }
       
       
       return ( render() )
}




export default Home;