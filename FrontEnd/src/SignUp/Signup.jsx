import './signup.css'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';



export function Signup(){
    
    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verificationCode, setverificationCode] = useState('');
    const [verify, setVerify] = useState(false);


    const submit = async (e) => {
        e.preventDefault()
    
        try {
            const res = await axios.post('http://localhost:3000/signup', {
                email: email,
                password: password
            })
            .then(res => {
                console.log(res)
                if(res.data.message !== "exist"){
                    setVerify(true)
                    // history('/main', {state:{id: email}})
                }else{
                    alert('User already exist')
                }

            })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    
    }

    const submitVerification = async (e) => {
        e.preventDefault();

        try{
            await axios.put('http://localhost:3000/verify',{
                email,
                verificationCode
            })
            .then(res =>{
                if(res.data.message === "success"){
                    history('/main', {state:{id: email}})
                }else{
                    alert('Invalid Verification Code')
                }
            })
        }catch(error){
            console.log(error)
        }



        
    }

    return(
        <div className="signup">
    {verify ? 
            <div className='verify'>
                <p>Verification code has been sent to your email</p>
                <form onSubmit={submitVerification}  className='verify-form'>
                    <input type="number" placeholder='Verification Code' onChange={(e) => setverificationCode(e.target.value)} />
                    <button className='verify-confirm'>Submit</button>
                </form>
            </div> 
            : 
        <div>
            <form onSubmit={submit} className='signup-form'>
                <p className='setup'>Let's set up your account</p>
                    <div className='two'>
                        <label htmlFor="email">Email</label>
                        <input className='enter-input' type="email" name='email' placeholder='Enter your email' onChange={e => setEmail(e.target.value)} required/>
                    </div>
                    <div className='two'>
                        <label htmlFor="password">Password</label>
                        <input className='enter-input' type="password" name='password' placeholder='Enter your password' onChange={e => setPassword(e.target.value)} required/>
                    </div>
                    <button type='submit' className='signup-confirm'>Sign Up</button>
            </form>
            <div className='acc-wrap'>
                <p className='have-acc'>Already have account?<a href="/login" className='login-here'>Login Here</a></p>
            </div>
        </div>
}
        </div>
    )
}