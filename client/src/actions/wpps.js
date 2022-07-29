import {FETCH_ALL_WPPS, CREATE_WPP, UPDATE_WPP, DELETE_WPPS} from '../constants/actionTypes';
import * as api from '../api';

export const getWpps = (filtros=null) => async (dispatch) => {
    try{
        const{data} = await api.getWpps(filtros)
        dispatch({type: FETCH_ALL_WPPS, payload:data})
        console.log(data)
        return data;
    }catch(error){
        console.log(error.message)
    }
}

export const createWpp = async (wpp, dispatch) => {
    try{
        const{data} = await api.createWpp(wpp)
        dispatch({type: CREATE_WPP, payload:data})
        console.log(data)
        return data
    }catch(error){
        console.log(error)
    }
}

export const updateWpp = async (wpp, dispatch) => {
    try{
        const {data} = await api.updateWpp(wpp)
        dispatch({type: UPDATE_WPP, payload:data})
    }catch(error){
        console.log(error)
    }
}

export const deleteWpps = async (id_wpps, dispatch) => {
    try{
        for (let index = 0; index < id_wpps.length; index++) {
            const{data} = await api.deleteWpps(id_wpps[index])
            dispatch({type: DELETE_WPPS, payload:data})
        }
    }catch(error){
        console.log(error)
    }
}
