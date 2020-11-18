/* eslint-disable */
import React,{useEffect,useReducer} from 'react'
import {useParams} from 'react-router-dom'
import { apiGET } from '../misc/config';

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

const Show = () => {
    const {id} = useParams();
    const [{error,show,isLoading},dispatch] = useReducer(reducer,intialState)
    // const [show,setShow] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);
    let isMounted = true;

    useEffect(()=>{
        apiGET(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(res=> res.json())
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
    },[id])
    console.log(show)
    if(isLoading){
        return(
            <div>Data is Loading</div>
        )
    }
    if(error){
        return (
            <div>Error occured :{error}</div>
        )
    }
    return (
        <div>
            This is Show Page for This ID:{id}
        </div>
    )
}

export default Show
