/* eslint-disable */
import React,{useState,useEffect} from 'react'
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGET } from '../misc/config';
import { useShows } from '../misc/custom-hooks';

export const Starred = () => {

    const [starred] = useShows();

    const [shows, setShows] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        if(starred && starred.length > 0){
            const promises = starred.map(showId => apiGET(`/shows/${showId}`).then(res => res.json()))
            Promise.all(promises)
                .then(apiData => apiData.map((show)=> ({show})))
                .then(result=>{
                    setShows(result)
                    setIsLoading(false);
                }).catch(err =>{{ 
                    setError(err.message);
                    setIsLoading(false);
                }});
        }else{
            setIsLoading(false)
        }

    },[starred])
    console.log(shows)
    return (


        <MainPageLayout>
            {isLoading && <div>Shows are still Loading</div>}
            {error && <div>Error occured: {error}</div>}
            {!isLoading && !shows && <div>no shows added</div>}
            {!isLoading && !error && shows && <ShowGrid data={shows}/>}
        </MainPageLayout>

    )
}

