import React from 'react';
import './paginado.css'

export default function Paginado ({dogsPerPage, allDogs, paginado}){
    const pageNumbers = []
    for(let i=0; i<Math.ceil(allDogs/dogsPerPage); i++){ //redondea todos los personajes por los personajes por pagina
    pageNumbers.push(i +1)
    }

    return (
        <nav>
            <ul className='paginado'>
                {pageNumbers && 
                pageNumbers.map(number => (
                    <li key={number}>
                   <button onClick={()=> paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}