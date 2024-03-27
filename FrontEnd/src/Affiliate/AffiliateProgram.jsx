import './affiliateProgram.css'
import { Link, useLocation } from "react-router-dom"
import { useState } from "react";
import axios from 'axios';

export function AffiliateProgram(){


    const [affiliateName, setAffiliateName] = useState('')
    const [productLink, setProductLink] = useState('')
    const [affiliateDescription, setAffiliateDescription] = useState('')
    const [price, setPrice] = useState('')
    const [commissionRate, setCommissionRate] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [userAffiliateID, setUserAffiliateID] = useState('')


    const [isDisabled, setIsDisabled] = useState(true)

    const location = useLocation();

    const index = location.state.index


    let id;

    if(localStorage.getItem('id') === null){
        window.location.href = '/login';
    } else{
        id = localStorage.getItem('id');
    }

    const pageLoad = async() => {
        console.log(id, index)
        await axios.post('http://localhost:3000/oneData', {
            id, index
        })
        .then(res => {
            console.log(res.data)
            setAffiliateName(res.data.affiliateName)
            setProductLink(res.data.productLink)
            setAffiliateDescription(res.data.affiliateDescription)
            setPrice(res.data.price)
            setCommissionRate(res.data.commissionRate)
            setStartDate(res.data.startDate)
            setEndDate(res.data.endDate)
        })
        await axios.post('http://localhost:3000/getUserID', {
            id
    })
    .then(res => {

        setUserAffiliateID(res.data)
    })
    }

    pageLoad();

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
                <li><Link state={{index: index}} className='affiliate-link clicked' to="/main/affiliate-links/affiliate-program"  href="#">Affiliate Program</Link></li>
                <li><Link state={{index: index}} className='affiliate-link' to="/main/affiliate-links/affiliates"  href="#">Affiliates</Link></li>
                <li><Link state={{index: index}} className='affiliate-link' to="/main/affiliate-links/email"  href="#">Emails</Link></li>
                <li><Link state={{index: index}} className='affiliate-link' to="/main/affiliate-links/transactions" onClick={(e) => e.preventDefault()} href="#">Transactions</Link></li>
                <li><Link state={{index: index}} className='affiliate-link' to="/main/affiliate-links/balance" href="#">Balance</Link></li>
            </ul>
            </div>
            <li ><Link to="/main/settings" className="setings-click" state={{from: "affiliate"}}  href="#">Settings</Link></li>
        </ul>
            </div>
        <div className="main-part affiliate-program">
<div className="affiliate-program-inputs">
    
                <div className='program-one-affiliate'>
                    <label htmlFor="affiliate-name">Affiliate Program Name: </label>
                    <input type="text" value={affiliateName} name="affiliate-name" disabled={isDisabled}/>
                  
                </div>
    
                <div className='desc-group'>
                    <label htmlFor="affiliate-description">Affiliate Program Description: </label>
                    <textarea className='description-input' name="affiliate-description" id="" cols="30" rows="10" disabled={isDisabled} value={affiliateDescription}></textarea>
                 

                </div>
    
                <div className='program-one-affiliate'>
                    <label htmlFor="product-link">Product Link: </label>
                    <input type="text" value={productLink} name="product-link" disabled={isDisabled}/>
                    

                </div>
    
                <div className='program-one-affiliate'>
                    <label htmlFor="price">Price: </label>
                    <input type="text" value={price} name="price" disabled={isDisabled}/>
                   

                </div>
    
                <div className='program-one-affiliate'>
                    <label htmlFor="commission-rate">Commission Rate: </label>
                    <input type="text" value={commissionRate} name="commission-rate" disabled={isDisabled}/>
                   
                </div>
    
                <div className='program-one-affiliate'>
                    <label htmlFor="start-date">Start Date: </label>
                    <input type="text" value={startDate} name="start-date" disabled={isDisabled}/>
                    
                </div>
    
                <div className='program-one-affiliate'>
                    <label htmlFor="end-date">End Date: </label>
                    <input type="text" value={endDate} name="end-date" disabled={isDisabled}/>
                   
                </div>
    
                <Link to={`/${affiliateName}/${userAffiliateID}/${index}`}><button>Get Link</button></Link>
                 <div>
                 <label htmlFor="registration-page">Affiliate Program Registration Link: </label>
                    <input className='registration-input' type="text" value={`http://localhost:5173/${affiliateName}/${userAffiliateID}/${index}`} name="registration-page" disabled/>
                </div>
</div>
        {/* <p>{affiliateName}</p>

<p>{productLink}</p>

<p>{affiliateDescription}</p>

<p>{price}</p>

<p>{commissionRate}</p>

<p>{startDate}</p>

<p>{endDate}</p>
<p>http://localhost:5173/{affiliateName}/{userAffiliateID}/{index}</p> */}
        </div>
        </div>
    )
}