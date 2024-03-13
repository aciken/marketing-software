import './login.css'

export function Login(){
    return(
     <div className="login">
        <form action="" className='login-form'>
            <p className='log'>Login to your account</p>
            <div className='two'>
                <label htmlFor="email">Email</label>
                <input className='enter-input' type="email" name='email' placeholder='Enter your email' required/>
            </div>
            <div className='two'>
                <label htmlFor="password">Password</label>
                <input className='enter-input' type="password" name='password' placeholder='Enter your password' required/>
            </div>
            <button className='login-confirm'>Login</button>
        </form>
        <div className='acc-wrap'>
            <p className='dont-have'>Don't have account?<a href="/signup" className='signup-here'>Sign Up Here</a></p>

        </div>
     </div>       
    )
}