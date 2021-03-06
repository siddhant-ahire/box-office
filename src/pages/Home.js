import React,{useState,useCallback} from 'react'
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import ActorGrid from '../components/actor/ActorGrid';
import { apiGET } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {SearchInput, RadioInputsWrapper, SearchButtonWrapper} from './Home.styled'
import CustomRadio from '../components/CustomRadio';

const renderResults = (result)=> {
    if(result && result.length === 0){
        return <div style={{textAlign:"center"}}>No results</div>
    }
    if(result && result.length>0){
        return (
            result[0].show 
            ?<ShowGrid data={result}/>:<ActorGrid data={result}/>
        )
    } 

    return null
}

export const Home = () => {

    const [input , setInput] = useLastQuery();
    const [result, setResult] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');

    const isShowSearch = searchOption === 'shows';

    const onSearch = ()=> {
            apiGET(`/search/${searchOption}?q=${input}`)
            .then(r => r.json())
            .then(results =>{
                setResult(results)
            })
    }
    const onInputChange = useCallback( (ev) =>{
        setInput(ev.target.value)
    },[setInput])
    const onKeyDown = (ev) =>{
        if(ev.keyCode === 13){
            onSearch();
        }
    }

    const onRadioChange = useCallback((ev)=>{
        setSearchOption(ev.target.value);
    },[])

    return (
        <MainPageLayout>
            <SearchInput type="text" onChange={onInputChange} onKeyDown={onKeyDown} value={input}/>
            <RadioInputsWrapper>
                <div>
                    <CustomRadio label="shows" value="shows" id="shows-search" onChange={onRadioChange} checked={isShowSearch}/>
                </div>
                <div>
                    <CustomRadio label="actor" value="people" id="actor-search" onChange={onRadioChange} checked={!isShowSearch}/>
                </div>
            </RadioInputsWrapper>
            <SearchButtonWrapper>
                <button type="button" onClick={onSearch}>Search</button>
            </SearchButtonWrapper>
            {renderResults(result)}
        </MainPageLayout>
    )
}
