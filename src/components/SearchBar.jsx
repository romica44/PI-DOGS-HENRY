import React from "react";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { getNameDog } from "../actions";



export default function SearchBar(){

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }

    

    function handleSubmit(e){
        e.preventDefault();
        var found = getNameDog(name);
        dispatch(found)
        setName('');
    }

    return (
        <>
            <input
                type='text'
                placeholder='Enter breed name here...' 
                onChange={e => handleInputChange(e)}
                value={name}
                className='input'
                onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
            />
            <button
                type='submit'
                onClick={e => handleSubmit(e)}
                className='fetch'
            >
                <strong>GO!</strong>
            </button>
        </>
    )
}