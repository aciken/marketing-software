import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import './linkPage.css';


export function LinkPageNew(){

    const { name, id, index } = useParams();
    console.log(name, id, index);

    const [affiliateEmail, setAffiliateEmail] = useState('');

    const [productLink, setProductLink] = useState('');
    const [affiliateDescription, setAffiliateDescription] = useState('');
    const [price, setPrice] = useState('');
    const [commissionRate, setCommissionRate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [autoApprove, setAutoApprove] = useState(false);

    const [emailSent, setEmailSent] = useState(false);

    const [BackgroundColor, setBackgroundColor] = useState('#ffffff');
    const [TextColor, setTextColor] = useState('#3b3b3b');
    const [ButtonColor, setButtonColor] = useState('#3b3b3b');
    const [ButtonTextColor, setButtonTextColor] = useState('#ffffff');
    const [HeadlineText, setHeadlineText] = useState('Default handle');
    const [EmailSentText, setEmailSentText] = useState('Default email sent text');

    const [sameEmail, setSameEmail] = useState(false);
    const [sameEmailText, setSameEmailText] = useState('User already exists');



    const [userEmail, setUserEmail] = useState('');

    const getUserData = async() =>{
        await axios.post('http://localhost:3000/getDataFromUserID', {
        name,id,index
    })
    .then(res =>{
        setProductLink(res.data.link.productLink);
        setAffiliateDescription(res.data.link.affiliateDescription);
        setPrice(res.data.link.price);
        setCommissionRate(res.data.link.commissionRate);
        setStartDate(res.data.link.startDate);
        setEndDate(res.data.link.endDate);
        setBackgroundColor(res.data.link.BackgroundColor);
        setTextColor(res.data.link.TextColor);
        setButtonColor(res.data.link.ButtonColor);
        setButtonTextColor(res.data.link.ButtonTextColor);
        setHeadlineText(res.data.link.HeadlineText);
        setEmailSentText(res.data.link.EmailSentText);
        setAutoApprove(res.data.link.autoApprove);
        setAffiliateEmail(res.data.email);
    })
        
    }

    getUserData();


    const createUserLink = async (e) => {
        e.preventDefault();
        console.log(name, productLink, affiliateDescription, price, commissionRate, startDate, endDate, index, userEmail, id)
        console.log('clicked')
        await axios.put('http://localhost:3000/affiliateUserLink', {
            affiliateName: name,
            productLink: productLink,
            affiliateDescription: affiliateDescription,
            price: price,
            commissionRate: commissionRate,
            startDate: startDate,
            endDate: endDate,
            linkNumber: index,
            userEmail: userEmail,
            userID: id
        })
        .then((res) => {
            console.log(res.data);
            console.log(res.data)
            if(res.data === 'User already exists'){

                setSameEmail(true);
                return;
            }
            else{

                axios.post('http://localhost:3000/affiliateLinkMail', {
                    userEmail, name, id:affiliateEmail, index
            })
            .then(res =>{
                setEmailSent(true);
            })
            }

        })
        .catch((error) => {
            console.log(error);
        })
    }



    return (
        <div className="linkPage" style={{backgroundColor: BackgroundColor}}>
            <p className="link-heading" style={{color: TextColor}}>{HeadlineText}</p>
            <form className="link-register-input" onSubmit={createUserLink}>
                {sameEmail ? <p>{sameEmailText}</p> : null}
                {emailSent ? <p>{EmailSentText}</p> : null}
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Enter your Email" onChange={(e) => setUserEmail(e.target.value)} required/>
                <button className="register-btn" type="submit" style={{backgroundColor: ButtonColor, color: ButtonTextColor}}>Register</button>
            </form>
            <div>.</div>

        </div>
    ); 
}