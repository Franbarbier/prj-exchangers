import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import { Redirect } from "react-router-dom";
import {login} from '../../actions/users';
import './Login.css';


const Login = () => {

 
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')



//   const handleLoginSubmit = async (event) =>{
    async function handleLoginSubmit(event) {
      event.preventDefault()
      var userAns = await login({username, password}, dispatch)
      console.log(userAns)
      console.log(localStorage)
    }

  function render(){
      return  <div id="Login-view">
                <div>
                  <h4>PRJ EXCHANGERS</h4>
                  <form onSubmit={handleLoginSubmit}>
                      <div>
                          {/* <label>Username</label> */}
                          <input placeholder="Username" onChange={ (e)=>{ setUsername(e.target.value) } } type="text" />
                      </div>
                      <div>
                          {/* <label>Password</label> */}
                          <input placeholder="Password" onChange={ (e)=>{ setPassword(e.target.value) } } type="password" />
                      </div>
                      <button>Ingresar</button>
                  </form>
                </div>
              </div>

       }
       
       
       return ( render() )
}




export default Login;