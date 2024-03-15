import {Nav} from './Nav.jsx'
import {Uses} from './Uses.jsx'
import { Reviews } from './Reviews.jsx';

export function LandingPage() {

    localStorage.removeItem('id'); 

    return(
        <div>
            <Nav/>
            <Uses/>
            <Reviews/>
        </div>
    )
}