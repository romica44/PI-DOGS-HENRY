import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import { useParams } from "react-router";
import './Detail.css';


export default function Detail(props) {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getDetail(id));

    },[dispatch,id])

    const detailDog = useSelector((state) => state.detail)
    console.log(detailDog)
    


    return (

        <div className='divDetail' >

            {      
                   detailDog.length === 0 ? <p>Loading...</p> :
                    detailDog.length > 0 &&

                    <div className=''>
                        <div><h1 className='name' >  {detailDog[0].name}</h1></div>
                        <img className= 'image' src={detailDog[0].image} alt='img not found' width="400px" height="250px" />
                        <div><p></p>
                         <h2 className='allTemps'>Temperaments:</h2><p className=''>{detailDog[0].createdInDb? detailDog[0].temperaments.map(el => el.name ).join(', '): detailDog[0].temperament.split(', ').map(e => e ).join(', ')}  </p> 
                        </div>

                        <h2>Weight:</h2><p  className='asd'  >{detailDog[0].weightMin} kgs -  {detailDog[0].weightMax} kgs </p>

                        <h2>Height:</h2> <p  className='asd' > {detailDog[0].heigthMin} cm - {detailDog[0].heightMax} cm   </p> 

                        <h2>Life Span: </h2> <p  className='asd' > {detailDog[0].life_span} </p> 
                         < a href='/home'> 

                            <button  className='buttonHome1'>RETURN HOME</button>
                         </a>
                    </div>

            }
           
        </div>

    )

}