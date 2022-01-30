import React from 'react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAll, getTemperaments, filterByTemperaments, filterCreated, orderByName, orderByWeight} from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card'
import Paginado from './Paginado'
import SearchBar from './SearchBar'
import './Home.css';
import './paginado.css';


export default function Home (){
    const dispatch = useDispatch()
    const allDogs = useSelector((state)=> state.dogs) //trae todo lo que este en la constante de dogs
    const [currentPage, setCurrentPage] = useState(1); //seteado el estado local, la pag actual y el estado que setee la pag
    const [dogsPerPage, /*setDogsPerPage*/] = useState(8); //los perros por paginas
    const indexOfLastDog = currentPage * dogsPerPage //Mi paginas por los dogs por pag 
    const indexOfFirstDog = indexOfLastDog - dogsPerPage 
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog) //divide el array de perros para cada pag, dejando 8porpag
    
    const [, setOrder] = useState('') // Estado local que me sirve para modificar el estado cuando ordeno y renderizar los perros ordenados como quiero.

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    } //para poder renderizar el paginado

    //me traigo los dogs cuando el componente se monta
    useEffect(()=> {
        dispatch(getAll()); //es lo mimso que el mapdistpachtoprops
    },[dispatch])

    useEffect(()=> {
        dispatch(getTemperaments());
    },[dispatch])

    const allTemperaments = useSelector((state)=> state.temperaments)
    //const [temperament, setTemperament] = useState("All")

    function handleClick(e){ // resetea todo, carga todo de nuevo
       e.preventDefault(); //se coloca de forma preventiva
        dispatch(getAll());
        // setBreeds('all');
        // setOrderWeight("");
        // setTemperament('All');
        setCurrentPage(1)
    }

    function handleSelect(e){
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterByTemperaments(e.target.value))
        // setTemperament(e.target.value)
       
    }

    const [, setBreeds] = useState('all')
    function handleFilterCreated(e){
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
        setBreeds(e.target.value)
        setCurrentPage(1)
    }

    
    function handleSort(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        //setOrder(e.target.value)
        setOrder(`{e.target.value}`)


    }

    const [, setOrderWeight] = useState("")
    function handleByWeight(e){
        e.preventDefault()
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)
        setOrderWeight(`Ordernado ${e.target.value}`)
       
    }

    return (
        <div className='home'>
            <div className='divnavbar'>
            <ul className='navbar'>
                <div className='dogs'>
                <li>
                  <button onClick={e=> handleClick(e)} className='newdog'>
                      ALL DOGS</button>
                
                
                   <Link to= '/dogs'><button className='newdog'>
                       CREATE A NEW DOG
                   </button></Link>
                </li>
                </div>

                <li className='content-select'>
                    <select onChange= {e=> handleSort(e)}>
                        <option value= 'selected' hidden className='newdog'>
                            Sort Breed by name </option>
                        <option value= 'asc'>A - Z</option>
                        <option value= 'desc'>Z - A</option>
                    </select>
                </li>
                <li className='content-select'>
                    <select onChange= {e=> handleByWeight(e)}>
                        <option value='selected' hidden >Sort by weight</option>
                        <option value='asc'>Lighter to heavier</option>
                        <option value='desc'>Heavier to lighter</option>
                    </select>
                </li>
                <li className='content-select'>
                    <select onChange={e=> handleSelect(e)}>
                    <option key={0} value='all' hidden >All temperaments</option>
                        {allTemperaments?.sort(function (a, b) {
                          if (a.name < b.name) return -1;
                          if (a.name > b.name) return 1;
                             return 0;
                        }).map(e => {
                            return (
                            <option key={e.id} 
                                    value={e.name}>{e.name}
                            </option>
                            )})
                        }
                    </select>
                </li>
                <li className='content-select'>
                    <select onChange={e=> handleFilterCreated(e)}>
                        <option value='all' hidden >All breeds</option>
                        <option value='api'>Existent breeds</option>
                        <option value='created'>Created breeds</option>
                    </select>
                </li>
                <div>
                    <SearchBar />
                </div>
            </ul>
        </div>

        <h1>DOGGIES</h1>
{/* 
        <Paginado
        dogsPerPage= {dogsPerPage}
        allDogs= {allDogs.length}
        paginado={paginado}/> */}

        <div className='container'>                

            {currentDogs?.map((e) => {
                return (
                <div key={e.id} className='card-home'>
                    <Link to= {"/home/" + e.id}>
                       <Card 
                         key={e.id}
                         name={e.name} 
                         image={e.image} 
                         weightMin={e.weightMin}
                         weightMax={e.weightMax}
                         heightMin={e.heightMin}
                         heightMax={e.heightMax}
                         temperaments={e.temperament}
                         life_span={e.life_span}
                        />
                    </Link>
                </div>
                )
            })
        }
       
    </div>
    
    
        <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
    
        <Link to='/' ><button className='welcome'><span>Welcome Page</span></button></Link>
    </div>

        
    )


}