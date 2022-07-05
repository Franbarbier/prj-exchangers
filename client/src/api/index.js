import axios from 'axios';

// // Obtenemos el token del localStorage
// const token = window.localStorage.getItem('token');

// const headers = {
//     'Authorization': `Bearer ${token}`
// }
const headers = '';

// const ENDPOINT = 'http://localhost:5000/';
const ENDPOINT = 'https://prj-exchanger.herokuapp.com/';


const url_plataformas = ENDPOINT+'plataformas'
export const getPlataformas = (filtros) => axios.get(url_plataformas, {...filtros, headers});
export const createPlataforma = (plataforma) => axios.post(url_plataformas, plataforma, {headers});
export const deletePlataformas = (id) => axios.delete(`${url_plataformas}/${id}`, {headers});

// export const updateCliente = (cliente) => axios.patch(`${url_clientes}/`, cliente, {headers});
// export const getOrdenesCliente = (id_cliente) => axios.get(`${url_clientes}/ordenes/${id_cliente}`, {headers});


