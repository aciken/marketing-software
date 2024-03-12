import './Nav.css'

import image from '../assets/Image-1.jpg'

export function Nav(){
    return(
            
            <div className='hero'>
                <div className='nav'>
                    <h1>Logo</h1>
                    <ul className="nav-right">
                        <li><a href="/login">Login</a></li>
                        <li><a href="/signup" className='signup-btn'>Sign Up</a></li>
                    </ul>
                </div>
                <div className='hero-content'>
                    <h1 className='hero-text'>Marketing software is a collection of web systems and applications that help businesses expand.</h1>
                    <p className='hero-text-small'>Affieliate marketing software as a service</p>
                    <button className='get-started-btn'>Get Started</button>
                    <img src={image} alt="" className='affieliate-showcase' />

            </div>
            </div>

    )
}