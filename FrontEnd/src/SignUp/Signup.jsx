import './signup.css'

export function Signup(){
    return(
        <div className="signup">
        <form action="" className='signup-form'>
            <p className='setup'>Let's set up your account</p>
                <div className='two'>
                    <label htmlFor="email">Email</label>
                    <input className='enter-input' type="email" name='email' placeholder='Enter your email' required/>
                </div>
                <div className='two'>
                    <label htmlFor="password">Password</label>
                    <input className='enter-input' type="password" name='password' placeholder='Enter your password' required/>
                </div>
                <button className='signup-confirm'>Sign Up</button>
        </form>
        <div className='acc-wrap'>
            <p className='have-acc'>Already have account?<a href="/login" className='login-here'>Login Here</a></p>
        </div>
        </div>
    )
}