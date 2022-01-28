import React from 'react';
import './Card.css';

export default function Card ({name,image,temperaments, weightMin, weightMax, life_span}){
    return (
       <div className='card' >
            <h1 className='info' >{name}</h1>
            <img src={image} alt={`${name}`} width='250px' heigth='200px' className='imageDog'/>
            <h3 className='info'>Temperaments: {temperaments}</h3>
            <h3 className='info'>Weight: {weightMin} - {weightMax} kg</h3> 
            <h3 className='info'>Expected life span: {life_span} - years</h3> 
                <></>
            
        </div>
    )
}