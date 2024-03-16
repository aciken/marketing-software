import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './linkPage.css';

export function AffiliatePage() {

    const location = useLocation();
    const data = location.state.data; 
    console.log(data)

    const [userEmail, setUserEmail] = useState('');

    const createUserLink = async (e) => {
        e.preventDefault();
        console.log('clicked')
        await axios.put('http://localhost:3000/affiliateUserLink', {
            affiliateName: data.affiliateName,
            productLink: data.productLink,
            affiliateDescription: data.affiliateDescription,
            price: data.price,
            commissionRate: data.commissionRate,
            startDate: data.startDate,
            endDate: data.endDate,
            id: location.state.id,
            linkNumber: data.linkNumber,
            userEmail: userEmail
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="linkPage">
            <p className="link-heading">Register for Affiliate Link of {data.affiliateName}</p>
            <form className="link-register-input" onSubmit={createUserLink}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Enter your Email" onChange={(e) => setUserEmail(e.target.value)}/>
                <button className="register-btn" type="submit">Register</button>
            </form>
            <div>.</div>

        </div>
    );
}