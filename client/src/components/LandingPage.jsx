import React from 'react';
import {Link} from 'react-router-dom';
import './landingPage.css'

export default function LandingPage(){
    return (
        <div className='divLanding'>
            <h1 className='doggy'>  wELCOME TO MY DOGGIE'S APP!</h1>
            <div></div>
            <Link to= "/home">
                <button type='image' className='button'>Enter</button>
            </Link>
            
        </div>
        
    )
}