import {FETCH_ALL_FAQS, CREATE_FAQ, UPDATE_FAQ, DELETE_FAQS} from '../constants/actionTypes';
import * as api from '../api';

export const getFaqs = (filtros=null) => async (dispatch) => {
    try{
        const{data} = await api.getFaqs(filtros)
        dispatch({type: FETCH_ALL_FAQS, payload:data})
        console.log(data)
        return data;
    }catch(error){
        console.log(error.message)
    }
}

export const createFaq = async (faq, dispatch) => {
    try{
        const{data} = await api.createFaq(faq)
        dispatch({type: CREATE_FAQ, payload:data})
        console.log(data)
        return data
    }catch(error){
        console.log(error)
    }
}

export const updateFaq = async (faq, dispatch) => {
    try{
        const {data} = await api.updateFaq(faq)
        dispatch({type: UPDATE_FAQ, payload:data})
    }catch(error){
        console.log(error)
    }
}

export const deleteFaqs = async (id_faqs, dispatch) => {
    try{
        for (let index = 0; index < id_faqs.length; index++) {
            const{data} = await api.deleteFaqs(id_faqs[index])
            dispatch({type: DELETE_FAQS, payload:data})
        }
    }catch(error){
        console.log(error)
    }
}
