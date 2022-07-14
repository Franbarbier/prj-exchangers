import {FETCH_ALL_PLATAFORMAS, CREATE_PLATAFORMA, UPDATE_PLATAFORMA, DELETE_PLATAFORMAS} from '../constants/actionTypes';
import * as api from '../api';

export const getPlataformas = (filtros=null) => async (dispatch) => {
    try{
        const{data} = await api.getPlataformas(filtros)
        dispatch({type: FETCH_ALL_PLATAFORMAS, payload:data})
        console.log(data)
        return data;
    }catch(error){
        console.log(error.message)
    }
}

export const createPlataforma = async (plataforma, dispatch) => {
    try{
        const{data} = await api.createPlataforma(plataforma)
        dispatch({type: CREATE_PLATAFORMA, payload:data})
        console.log(data)
        return data
    }catch(error){
        console.log(error)
    }
}

export const updatePlataforma = async (plataforma, dispatch) => {
    try{
        const {data} = await api.updatePlataforma(plataforma)
        dispatch({type: UPDATE_PLATAFORMA, payload:data})
    }catch(error){
        console.log(error)
    }
}

export const deletePlataformas = async (id_plataformas, dispatch) => {
    try{
        for (let index = 0; index < id_plataformas.length; index++) {
            const{data} = await api.deletePlataformas(id_plataformas[index])
            dispatch({type: DELETE_PLATAFORMAS, payload:data})
        }
    }catch(error){
        console.log(error)
    }
}
