import React from 'react';
import './Card.css';

export default function Card ({name,image,temperaments, weightMin, weightMax}){
    return (
       <div className='card' >
            <h1 className='info' >{name}</h1>
            <h3 className='info'>{temperaments}</h3>
            <img src={image} alt={`${name}`} width='250px' heigth='200px' className='imageDog'/>
            {
                name !== 'Sorry, looks like we don´t have that dog breed' ?
                <h3 className='info'>Weight: {weightMin} - {weightMax} kg</h3> :
                <></>
            }
        </div>
    )
}