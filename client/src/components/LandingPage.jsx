import React from 'react';
import {Link} from 'react-router-dom';
import './landingPage.css'

export default function LandingPage(){
    return (
        <div className='divLanding'>
            <h1> Welcome my Doggy's App!</h1>
            <Link to= "/home">
                <button className='button'>Enter</button>
            </Link>
        </div>
    )
}