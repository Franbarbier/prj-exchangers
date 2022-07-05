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
    // try{
    //     const {data} = await api.updateCliente(cliente)
    //     dispatch({type: UPDATE_CLIENTE, payload:data})
    // }catch(error){
    //     console.log(error)
    // }
}

export const deletePlataformas = async (id_objeciones, dispatch) => {
    try{
        for (let index = 0; index < id_objeciones.length; index++) {
            const{data} = await api.deletePlataformas(id_objeciones[index])
            dispatch({type: DELETE_PLATAFORMAS, payload:data})
        }
    }catch(error){
        console.log(error)
    }
}
