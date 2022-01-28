import React from 'react';
import {Link} from 'react-router-dom';
import './landingPage.css'

export default function LandingPage(){
    return (
        <div className='divLanding'>
            <h1 className='doggy'> Welcome my Doggy's App!</h1>
            <div></div>
            <Link to= "/home">
                <button type='image' className='button'>Enter</button>
            </Link>
            
        </div>
        
    )
}