import axios from 'axios';
import { ENDPOINT } from '../global';

// // Obtenemos el token del localStorage
const token = window.localStorage.getItem('token');

const headers = {
    'Authorization': `Bearer ${token}`
}
// const headers = '';



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


const url_wpps = ENDPOINT+'wpps'
export const getWpps = (filtros) => axios.get(url_wpps, {...filtros, headers});
export const createWpp = (wpp) => axios.post(url_wpps, wpp, {headers});
export const deleteWpps = (id) => axios.delete(`${url_wpps}/${id}`, {headers});
export const updateWpp = (wpp) => axios.patch(`${url_wpps}/`, wpp, {headers});


const url_users = ENDPOINT+'users'
export const login = (user) => axios.post(`${url_users}/login`, user);

export const verifyUser = async (id) => {

    var res = await fetch(`${url_users}/verify`, {method: 'GET', headers})
    .then(response => response.json())
    .then(data => data);

    return res
}
