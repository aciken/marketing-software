import './login.css'
import axios from 'axios'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';




export function Login(){

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verify, setVerify] = useState(false);
    const [verificationCode, setverificationCode] = useState('');

    const login = async (e) => {
        e.preventDefault()
        
        try {
            await axios.post('http://localhost:3000/login', {
                email: email,
                password: password
            })
            .then(res => {
                console.log(res)
                if(res.data !== "failed"){
                    if(res.data.verify === 1){
                        navigate('/main', {state:{id: email}});
                    } else{
                        setVerify(true)
                    }
                }else{
                    alert('Invalid Credentials')
                }
        })
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
                    navigate('/main', {state:{id: email}});
                }else{
                    alert('Invalid Verification Code')
                }
            })
        }catch(error){
            console.log(error)
        }



        
    }


    return(
     <div className="login">
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
            <form onSubmit={login} className='login-form'>
                <p className='log'>Login to your account</p>
                <div className='two'>
                    <label htmlFor="email">Email</label>
                    <input className='enter-input' type="email" name='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className='two'>
                    <label htmlFor="password">Password</label>
                    <input className='enter-input' type="password" name='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button className='login-confirm'>Login</button>
            </form>
            <div className='acc-wrap'>
                <p className='dont-have'>Don't have account?<a href="/signup" className='signup-here'>Sign Up Here</a></p>
            </div>
        </div>
}
     </div>       
    )
}