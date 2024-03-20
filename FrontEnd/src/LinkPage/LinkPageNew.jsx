import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import './linkPage.css';

export function LinkPageNew(){

    const { name, id, index } = useParams();
    console.log(name, id, index);


    const [productLink, setProductLink] = useState('');
    const [affiliateDescription, setAffiliateDescription] = useState('');
    const [price, setPrice] = useState('');
    const [commissionRate, setCommissionRate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [emailSent, setEmailSent] = useState(false);

    const [BackgroundColor, setBackgroundColor] = useState('#ffffff');
    const [TextColor, setTextColor] = useState('#3b3b3b');
    const [ButtonColor, setButtonColor] = useState('#3b3b3b');
    const [ButtonTextColor, setButtonTextColor] = useState('#ffffff');
    const [HeadlineText, setHeadlineText] = useState('Default handle');
    const [EmailSentText, setEmailSentText] = useState('Default email sent text');



    const [userEmail, setUserEmail] = useState('');

    const getUserData = async() =>{
        await axios.post('http://localhost:3000/getDataFromUserID', {
        name,id,index
    })
    .then(res =>{
        console.log(res.data);
        setProductLink(res.data.productLink);
        setAffiliateDescription(res.data.affiliateDescription);
        setPrice(res.data.price);
        setCommissionRate(res.data.commissionRate);
        setStartDate(res.data.startDate);
        setEndDate(res.data.endDate);
        setBackgroundColor(res.data.BackgroundColor);
        setTextColor(res.data.TextColor);
        setButtonColor(res.data.ButtonColor);
        setButtonTextColor(res.data.ButtonTextColor);
        setHeadlineText(res.data.HeadlineText);
        setEmailSentText(res.data.EmailSentText);
    })
        
    }

    getUserData();


    const createUserLink = async (e) => {
        console.log(name, productLink, affiliateDescription, price, commissionRate, startDate, endDate, index, userEmail, id)
        e.preventDefault();
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
            setEmailSent(true);
        })
        .catch((error) => {
            console.log(error);
        })
    }



    return (
        <div className="linkPage" style={{backgroundColor: BackgroundColor}}>
            <p className="link-heading" style={{color: TextColor}}>{HeadlineText}</p>
            <form className="link-register-input" onSubmit={createUserLink}>
                {emailSent ? <p>{EmailSentText}</p> : null}
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Enter your Email" onChange={(e) => setUserEmail(e.target.value)}/>
                <button className="register-btn" type="submit" style={{backgroundColor: ButtonColor, color: ButtonTextColor}}>Register</button>
            </form>
            <div>.</div>

        </div>
    ); 
}