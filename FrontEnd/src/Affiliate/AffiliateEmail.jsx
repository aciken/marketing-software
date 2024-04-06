import { Link, useLocation } from "react-router-dom"
import './affiliateEmail.css'
import axios from 'axios'
import { useEffect, useState } from "react"


export function AffiliateEmail(){

const location  = useLocation()

const [whatError, setWhatError] = useState('')

const [sendEmail, setSendEmail] = useState('')
const [allEmails, setAllEmails] = useState([])
const [emailIndex, setEmailIndex] = useState(0)

const [verifyEmail, setVerifyEmail] = useState(false)

const [addInput, setAddInput] = useState(false)

const [popup, setPopup] = useState(false)

const [email, setEmail] = useState('')

const [allEmailsID, setAllEmailsID] = useState([])



//verify email

const [nickname, setNickname] = useState('')
const [fromEmail, setFromEmail] = useState('')
const [fromName, setFromName] = useState('')
const [replyTo, setReplyTo] = useState('')
const [replyToName, setReplyToName] = useState('')
const [address, setAddress] = useState('')
const [address2, setAddress2] = useState('')
const [country, setCountry] = useState('')
const [city, setCity] = useState('')
const [zip, setZip] = useState('')


//verify email


    const [selectedEmailBtn1, setSelectedEmailBtn1] = useState('selected-email-btn');
    const [selectedEmailBtn2, setSelectedEmailBtn2] = useState('');
    const [selectedEmailBtn3, setSelectedEmailBtn3] = useState('');



    const index = location.state.index 

    let id;

    if(localStorage.getItem('id') === null){
        window.location.href = '/login';
    } else{
        id = localStorage.getItem('id');
    }


    useEffect(() => {
        const pageLoad = async() => {
            await axios.post('http://localhost:3000/allData', {
                id
            })
            .then(res => {
                console.log(res.data.sendMail)
                console.log(res.data.sendmails)
                setAllEmailsID(res.data.sendMails)
                setEmailIndex(res.data.links[index].emailIndex)
                console.log(res.data.links[index].sendEmails)
                setSendEmail(res.data.links[index].sendEmail)    
                
                axios.post('http://localhost:3000/getEmailFromID', {
                    id
                })  
                .then(res => {
                    console.log(res.data) 
                    setAllEmails(res.data)
            })
            })
        }
    
        pageLoad();
    }, []); 

    

    const addPopup = () => {
        setPopup(!popup)
        console.log(popup)
        setWhatError("")
    }

    const addMail = async(e) => {
        e.preventDefault();



        await axios.post('http://localhost:3000/VerificationEmail', {
            id,index,nickname,fromEmail,fromName,replyTo,replyToName,address,address2,country,city,zip,email
        })
        .then(res => {
            console.log(res.data)
            if(res.data.id === undefined){
                setWhatError(res.data)
            } else{
                const emailID = res.data.id
                axios.put('http://localhost:3000/addMailID', {
                    id,index,emailID
                })
                .then(res =>{
                    console.log(res.data);
                    setVerifyEmail(false)
                    axios.post('http://localhost:3000/getEmailFromID', {
                        id
                    })
                    .then(res => {
                        console.log(res.data) 
                        setAllEmails(res.data)
                })
                })
            }    
        })
        .catch(err => console.log(err))
    }



        // await axios.put('http://localhost:3000/addMail', {
        //     id,index,nickname,fromEmail,fromName,replyTo,replyToName,address,address2,country,city,zip,email
        // })
        // .then(res => {
    
        //     axios.post('http://localhost:3000/allData', {
        //         id
        //     })
        //     .then(res =>{
        //         setAddInput(false)
        //         setAllEmails(res.data.links[index].sendEmails)
        //     })
        //     console.log(res.data)
        // })

        
    
        const changeEmail = async(eIndex,e) => {


            console.log(e.target.textContent)
   if(e.target.textContent !== "Delete"){


            console.log(allEmails[eIndex][1])

                console.log(allEmails[eIndex][1])
            if(allEmails[eIndex][1] !== false){

            await axios.put('http://localhost:3000/changeEmail', {
                eIndex,
                index,
                id
            })
            .then(res => {
                setSendEmail(allEmails[eIndex][0])
                setEmailIndex(eIndex)
                console.log(res.data)
            })
            .catch(err => console.log(err))
        }
        }
        }

        const deleteEmail = async(mailID, mail) => {

            if(mail != sendEmail){
                console.log(mailID)
                await axios.post('http://localhost:3000/deleteEmail', {
                mailID,mail,id,index       
            })
            .then(res => {
                console.log(res.data); 
                if(res.data.length === 0){
                    setAllEmails([])
                } else {
                    axios.post('http://localhost:3000/getEmailFromID', {
                        id
                    })
                    .then(res => {
                        console.log(res.data.length)
                        console.log(res.data)
                        setAllEmails(res.data)
                        console.log(allEmails)
                    })
                }

            })
            .catch(err => console.log(err))
            }


        }

        const changeSendEmail = async(e,funcEmail, funcVerified) => {
            console.log(e.target.textContent)
            if(e.target.textContent !== "Delete"){
                if(funcVerified !== false){
                    setSendEmail(funcEmail)
                    await axios.put('http://localhost:3000/changeEmail', {
                    id,index,funcEmail 
                })
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => console.log(err))
                } 
            }

        }
            
        

    
    return(
        <div className='main'>
        <div className='loged-nav'>
        <h1 className='loged-logo'>Logo</h1>
        <ul className='nav-ul'>
            <div>
                <li ><Link to="/main" state={{from: "affiliate"}}  href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>home</title><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg> <span>Home</span></Link></li>
                <li>
        <Link 
            to="/main/dashboard" 
            state={{ from: "affiliate" }}
            onClick={() => console.log('click')} 
           
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>view-dashboard</title>
        <path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
            </svg>
            Dashboard
        </Link>
        </li>
                <li ><Link to="/main/affiliate-links"   href="#"><svg className='affiliate-svg-hide' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>link-box-variant</title><path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.94,14.81L11.73,17C11.08,17.67 10.22,18 9.36,18C8.5,18 7.64,17.67 7,17C5.67,15.71 5.67,13.58 7,12.26L8.35,10.9L8.34,11.5C8.33,12 8.41,12.5 8.57,12.94L8.62,13.09L8.22,13.5C7.91,13.8 7.74,14.21 7.74,14.64C7.74,15.07 7.91,15.47 8.22,15.78C8.83,16.4 9.89,16.4 10.5,15.78L12.7,13.59C13,13.28 13.18,12.87 13.18,12.44C13.18,12 13,11.61 12.7,11.3C12.53,11.14 12.44,10.92 12.44,10.68C12.44,10.45 12.53,10.23 12.7,10.06C13.03,9.73 13.61,9.74 13.94,10.06C14.57,10.7 14.92,11.54 14.92,12.44C14.92,13.34 14.57,14.18 13.94,14.81M17,11.74L15.66,13.1V12.5C15.67,12 15.59,11.5 15.43,11.06L15.38,10.92L15.78,10.5C16.09,10.2 16.26,9.79 16.26,9.36C16.26,8.93 16.09,8.53 15.78,8.22C15.17,7.6 14.1,7.61 13.5,8.22L11.3,10.42C11,10.72 10.82,11.13 10.82,11.56C10.82,12 11,12.39 11.3,12.7C11.47,12.86 11.56,13.08 11.56,13.32C11.56,13.56 11.47,13.78 11.3,13.94C11.13,14.11 10.91,14.19 10.68,14.19C10.46,14.19 10.23,14.11 10.06,13.94C8.75,12.63 8.75,10.5 10.06,9.19L12.27,7C13.58,5.67 15.71,5.68 17,7C17.65,7.62 18,8.46 18,9.36C18,10.26 17.65,11.1 17,11.74Z" /></svg><svg className='arrow-svg-show' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>Affiliate Links</Link></li>
            <ul className="pod-links-stay">       
            <li><Link state={{index: index}} className='affiliate-link' to="/main/affiliate-links/affiliate-program"  href="#">Affiliate Program</Link></li>
                <li><Link state={{index: index}} className='affiliate-link' to="/main/affiliate-links/affiliates"  href="#">Affiliates</Link></li>
                <li><Link className='affiliate-link clicked' to="/main/affiliate-links/email" onClick={(e) => e.preventDefault()} href="#">Emails</Link></li>
                <li><Link state={{index: index}} className='affiliate-link' to="/main/affiliate-links/transactions" href="#">Transactions</Link></li>
                <li><Link state={{index: index}} className='affiliate-link' to="/main/affiliate-links/balance" href="#">Balance</Link></li>
            </ul>
            </div>
            <li ><Link to="/main/settings" className="setings-click" state={{from: "affiliate"}}  href="#">Settings</Link></li>
        </ul>
            </div>
        <div className="main-part email">
            {popup ? 
            <div className="popup email">
                {!verifyEmail ? <div className="popup-box email">
                    <div className="popup-box-title">
                        {addInput ? <form className="add-input" onSubmit={addMail}>
                        <input  type="email" placeholder="Email" required  onChange={(e) => setEmail(e.target.value)}/>
                         <button type="submit" className="submit">Submit</button>
                         <button onClick={() => setAddInput(false)} className="cancle">Cancle</button>
                         </form> 
                         : <div>
                            <p className="one-send-email" onClick={() => setVerifyEmail(true)}>Add Email +</p>
                            <div className="one-wrapper first" onClick={(e) => changeSendEmail(e,'adrianmarton2006@gmail.com', true)}>
                                <div className="left-part" >
                                    <p>adrianmarton2006@gmail.com</p>
                                    <div className="bottom">
                                    <span className="verified">verified</span>
                                    {sendEmail == 'adrianmarton2006@gmail.com' ? <p>Selected</p> : null}
                                    </div>


                                </div>
                            </div>
                        </div>}
                        <p onClick={() => setPopup(false)} className="close-email-popup">x</p>



                    {allEmails.map((email, index) => {
                        return <div key={index} data-index={index} className="one-wrapper" onClick={(e) => changeSendEmail(e,email.from.email, email.verified.status)}>
                        <div className="left-part">
                            <p  key={index}>{email.from.email}</p>
                            <div className="bottom">
                            {email.verified.status ? <span className="verified">verified</span> : <span className="unverified">unverified</span>}
                            {sendEmail == email.from.email ? <p>Selected</p> : null}
                            </div>
                        
                        </div>

                            <p className="delete-wrap" onClick={() => deleteEmail(email.id, email.from.email)}>Delete</p>
                    </div>
                    })}

                        {/* {allEmailsID.map((email, index) => {
                            return <div key={index} data-index={index} className="one-wrapper" onClick={(e) => changeEmail(index,e)}>
                            <div className="left-part">
                                <p  key={index}>{email}</p>
                                <p className="status-wrap">Status: {email[1] ? <span className="verified">verified</span> : <span className="unverified">unverified</span>} {index === emailIndex ? <span className="in-use-span">In Use</span> : null}</p>
                            
                            </div>

                                <p className="delete-wrap" onClick={() => deleteEmail(index)}>Delete</p>
                        </div>
                        })} */}
                    </div>
                    <form className="popup-form">

                    </form>
                </div> : 
                <div className="popup-box email">
                    <form onSubmit={addMail} className="add-mail-form">
                    <input type="text" placeholder="Nickname" onChange={(e) => setNickname(e.target.value)} required/>
                    <input type="email" name="" id="" placeholder="Email" onChange={(e) => setFromEmail(e.target.value)} required/>
                    <input type="text" placeholder="From Name" onChange={(e) => setFromName(e.target.value)} required/>
                    <input type="email" placeholder="Reply To" onChange={(e) => setReplyTo(e.target.value)} required/>
                    <input type="text" placeholder="Reply To Name" onChange={(e) => setReplyToName(e.target.value)} required/>
                    <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} required/>
                    <input type="text" placeholder="Address 2" onChange={(e) => setAddress2(e.target.value)} />
                    <input type="text" placeholder="Country" onChange={(e) => setCountry(e.target.value)} required/>
                    <input type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} required/>
                    <input type="text" placeholder="Zip" onChange={(e) => setZip(e.target.value)} required />
                    <p>{whatError}</p>
                    <button type="Submit" className="add-mail-btn">Submit</button>
                    </form>
                 

                    <p onClick={() => {setVerifyEmail(false); setWhatError("")}} className="close-email-popup"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left-thin</title><path d="M10.05 16.94V12.94H18.97L19 10.93H10.05V6.94L5.05 11.94Z" /></svg></p>
                </div> }

    
                </div> : null}
                
            <div className="email-box">
            <p className="title email">Affiliate Program Emails</p>
                <form className="email-add-form">
                    <label htmlFor="send-email">Send Email:</label>
                    <input type="email" placeholder="Email" name="send-email"  value={sendEmail} readOnly={true} onFocus={(e) => e.target.blur()} onClick={(e) => addPopup()}/>
                </form>
                
                <div className="email-wrapper">
                        <div className="email-icons">
                            <button className={selectedEmailBtn1} onClick={() => {setSelectedEmailBtn1('selected-email-btn'); setSelectedEmailBtn2(''); setSelectedEmailBtn3('')}}>Auto Approve Email</button>
                            <button className={selectedEmailBtn2} onClick={() => {setSelectedEmailBtn2('selected-email-btn'); setSelectedEmailBtn1(''); setSelectedEmailBtn3('')}}>Waiting for Approval Email</button>
                            <button className={selectedEmailBtn3} onClick={() => {setSelectedEmailBtn3('selected-email-btn'); setSelectedEmailBtn2(''); setSelectedEmailBtn1('')}}>Approved Email</button>


                                
                        </div>
                        {selectedEmailBtn1 === 'selected-email-btn' ? <div className="email-box">
                                <p className="email-title">Auto Approve Email</p>
                                <p className="email-text">This email is sent to the affiliate when they are approved to the program.</p>
                            </div> : null}
                            {selectedEmailBtn2 === 'selected-email-btn' ? <div className="email-box">
                                <p className="email-title">Waiting for Approval Email</p>
                                <p className="email-text">This email is sent to the affiliate when they are waiting for approval.</p>
                            </div> : null}
                            {selectedEmailBtn3 === 'selected-email-btn' ? <div className="email-box">
                                <p className="email-title">Approved Email</p>
                                <p className="email-text">This email is sent to the affiliate when they are approved to the program.</p>
                            </div> : null}

                </div>
                </div>
        </div>
        </div>

    )
}
