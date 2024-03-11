import './Nav.css'
import face from '../assets/face.png'

export function Nav(){
    return(
            
            <div className='hero'>
                <div className='nav'>
                    <h1>Logo</h1>
                    <ul className="nav-right">
                        <li><a href="#">Login</a></li>
                        <li><a href="#" className='signup-btn'>Sign Up</a></li>
                    </ul>
                </div>
                <div className='hero-content'>
                    <h1 className='hero-text'>Marketing software is a collection of web systems and applications that help businesses expand.</h1>
                    <p className='hero-text-small'>Affieliate marketing software as a service</p>
                    <button className='get-started-btn'>Get Started</button>
            <div className='cards-part'>
                <div className="name-card">
                    <img className='face' src={face} alt="" />
                    <p className='card-text'>"MarketUs is the Affieliate software on the market. With only few clicks and without changing your code, your Affieliate link is set-up and ready to use."</p>
                    <p className='card-name'>Adrian Marton</p>
                    <p className='card-role'>Founder of MarketUs</p>
                </div>

            </div>
            </div>
            </div>

    )
}