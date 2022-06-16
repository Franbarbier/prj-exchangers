import React, {useState, useMemo, useEffect, useRef} from 'react';

import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';


const AppContext = React.createContext();

export function AppProvider(props){



    const value = useMemo(()=>{
        return ({
            loading: {projects: ''}
        })
    }, [])
    
    console.log(value)

    return <AppContext.Provider value={value} {...props} />

}

export function useAppContext(){
    const context = React.useContext(AppContext)
    if(!context){
        throw new Error("useAppContext must be inside AppContext provider")
    }
    return context;
}