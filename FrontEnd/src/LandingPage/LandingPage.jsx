import {Nav} from './Nav.jsx'
import {Uses} from './Uses.jsx'

export function LandingPage() {

    localStorage.removeItem('id'); 

    return(
        <div>
            <Nav/>
            <Uses/>
        </div>
    )
}