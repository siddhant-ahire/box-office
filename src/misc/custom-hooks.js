/* eslint-disable */

import { useReducer, useEffect, useState } from 'react'
import {apiGET} from './config'

const showsReducer = (prevState, action)=>{
    switch (action.type){

        case 'ADD':{
            return [...prevState, action.showId]
        }
        case 'REMOVE':{
            return prevState.filter((showId)=> showId !== action.showId);
        }

        default: return prevState;
    }
}


function usePersistedReducer(reducer, initialState, key) {
    const [state, dispatch] = useReducer(reducer, initialState, (initial)=>{

        const persisted = localStorage.getItem(key);
        return persisted ? JSON.parse(persisted) : initial;
    });

    useEffect(() =>{
        localStorage.setItem(key,JSON.stringify(state));
    },[state, key]);

    return [state, dispatch];
}
export function useShows(key = 'shows') {
    return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key='lastQuery'){
    const [input, setInput] = useState(()=>{
        const persisted = sessionStorage.getItem(key);
        return persisted ? JSON.parse(persisted) : "";
    });

    const setPersistedInput = newState =>{
        setInput(newState);
        sessionStorage.setItem(key, JSON.stringify(newState));
    }
    return [input, setPersistedInput];
}
const reducer = (prevState, action) =>{
    switch(action.type) {
        case 'FETCH_SUCCESS':{
            return {isLoading:false, error:null, show:action.show}
        }
        case 'FETCH_FAILED':{
            return {...prevState,isLoading:false, error:action.error}
        }
    }
}
const intialState = {
    show:null,
    isLoading:true,
    error:null
}

export function useShow(showId){
    const [state, dispatch] = useReducer(reducer,intialState)
    // const [show,setShow] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);
    let isMounted = true;

    useEffect(()=>{
        apiGET(`/shows/${showId}?embed[]=seasons&embed[]=cast`).then(res=> res.json())
        .then(result=>{
            if(isMounted){
                    dispatch({type:'FETCH_SUCCESS', show:result})
            }
        }).catch(err => {
            if(isMounted){
                   dispatch({type:'FETCH_FAILED',error:err.message}) 
            }
            });
        return ()=>{
            isMounted=false;
        }
    },[showId])
    return state;
}