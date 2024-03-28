import {Nav} from './Nav.jsx'
import {Uses} from './Uses.jsx'
import { Reviews } from './Reviews.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function LandingPage() {

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('id') !== null){
            navigate('/main')
        }
    }, []); 



    return(
        <div>
            <Nav/>
            <Uses/>
            <Reviews/>
        </div>
    )
}