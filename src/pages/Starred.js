import React,{useState} from 'react'
import MainPageLayout from '../components/MainPageLayout';
import { apiGET } from '../misc/config';


export const Starred = () => {

    const [input , setInput] = useState('');
    const [result, setResult] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');

    const isShowSearch = searchOption === 'shows';

    const onSearch = ()=> {
            apiGET(`/search/${searchOption}?q=${input}`)
            .then(r => r.json())
            .then(results =>{
                console.log(results);
                setResult(results)
            })
            .catch(err => console.log(err));
    }
    const onInputChange = (ev) =>{
        console.log(ev.target.value)
        setInput(ev.target.value)
    }
    const onKeyDown = (ev) =>{
        if(ev.keyCode === 13){
            onSearch();
        }
    }
    const renderResults = ()=> {
        if(result && result.length === 0){
            return <div>No results</div>
        }
        if(result && result.length>0){
            return (
                result[0].show?
                    result.map((item)=>{
                    console.log(item)
                   return (
                   <div key={item.show.id}>{item.show.name}</div>)
                }):
                result.map((item)=>{
                    console.log(item)
                   return (
                   <div key={item.person.id}>{item.person.name}</div>)
                   }
            )
            )
        } 

        return null
    }
    const onRadioChange = (ev)=>{
        console.log(ev.target.value);
        setSearchOption(ev.target.value);
    }
    return (
        <MainPageLayout>
            <div>This is Starred Page</div>
            <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} value={input}/>
            <div>
            <label htmlFor="shows-search">
                Shows<input type="radio" value="shows" id="shows-search" onClick={onRadioChange} checked={isShowSearch}/>
            </label>
            <label htmlFor="actor-search">
               Actor<input type="radio" value="people" id="actor-search" onClick={onRadioChange} checked={!isShowSearch}/>
            </label>
            </div>
            <button type="button" onClick={onSearch}>Search</button>
            {renderResults()}
        </MainPageLayout>
    )
}
