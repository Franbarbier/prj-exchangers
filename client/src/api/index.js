import axios from 'axios';
import { ENDPOINT } from '../global';

// // Obtenemos el token del localStorage
// const token = window.localStorage.getItem('token');

// const headers = {
//     'Authorization': `Bearer ${token}`
// }
const headers = '';

// const ENDPOINT = 'http://localhost:5000/';
// const ENDPOINT = 'https://prj-calc.herokuapp.com/';


const url_plataformas = ENDPOINT+'plataformas'
export const getPlataformas = (filtros) => axios.get(url_plataformas, {...filtros, headers});
export const createPlataforma = (plataforma) => axios.post(url_plataformas, plataforma, {headers});
export const uploadIcon = (archivo) => axios.post(ENDPOINT+'upload-icon', archivo);
export const deletePlataformas = (id) => axios.delete(`${url_plataformas}/${id}`, {headers});
export const updatePlataforma = (plataforma) => axios.patch(`${url_plataformas}/`, plataforma, {headers});

// export const getOrdenesCliente = (id_cliente) => axios.get(`${url_clientes}/ordenes/${id_cliente}`, {headers});

const url_faqs = ENDPOINT+'faqs'
export const getFaqs = (filtros) => axios.get(url_faqs, {...filtros, headers});
export const createFaq = (faq) => axios.post(url_faqs, faq, {headers});
export const deleteFaqs = (id) => axios.delete(`${url_faqs}/${id}`, {headers});
export const updateFaq = (faq) => axios.patch(`${url_faqs}/`, faq, {headers});

// export const getOrdenesCliente = (id_cliente) => axios.get(`${url_clientes}/ordenes/${id_cliente}`, {headers});


