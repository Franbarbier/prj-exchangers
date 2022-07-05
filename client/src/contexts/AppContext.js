import React, {useState, useMemo, useEffect, useRef} from 'react';

import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

import { getPlataformas } from '../actions/plataformas';


const AppContext = React.createContext();

export function AppProvider(props){

    const dispatch = useDispatch()
    const { pathname } = useLocation()
    
    const [loadingPlataformas, setLoadingPlataformas] = useState(false) 
    
    const [notifications, setNotifications] = useState([])
    
    const setters = [setLoadingPlataformas]

    
    useEffect(()=>{
        setNotifications([])
    }, [pathname])

    useEffect(()=>{
        setAllLoading()
        if(!window.location.href.includes('login')){
            setAllLoading(true)
           dispatch(getPlataformas()).then(()=>setLoadingPlataformas(false))        
        //    getPlataformas().then(()=>setLoadingPlataformas(false))
        }
    }, [pathname])

    function setAllLoading(){
        for(let setter of setters){
            setter(true)
        }
    }

    const value = useMemo(()=>{
        return ({
            loading: {plataformas: loadingPlataformas},
            notifications,
            setNotifications
        })
    }, [loadingPlataformas, notifications])

    return <AppContext.Provider value={value} {...props} />

}

export function useAppContext(){
    const context = React.useContext(AppContext)
    if(!context){
        throw new Error("useAppContext must be inside AppContext provider")
    }
    return context;
}