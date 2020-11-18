import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import { apiGET } from '../misc/config';

const Show = () => {
    const {id} = useParams();
    const [show,setShow] = useState(null);
    
    useEffect(()=>{
        apiGET(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(res=> res.json()).then(result=>{
            setShow(result)
            console.log(result)
        })
    },[id])
    console.log(show)
    return (
        <div>
            This is Show Page for This ID:{id}
        </div>
    )
}

export default Show
