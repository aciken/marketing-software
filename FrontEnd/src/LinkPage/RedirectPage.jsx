import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export function RedirectPage() {

        const { name, id, index, user} = useParams();
        const navigate = useNavigate();

        console.log(name, id, index, user);

        const redirect = async () => {

                await axios.post('http://localhost:3000/redirect', {
                        id, index, userID: user
                    })
        .then(res => {
                console.log(res.data);

                const affiliateID = res.data.genKey;
                const url = new URL(res.data.linkRedirect);
                url.searchParams.append('affiliateID', affiliateID);

                window.location.href = url.toString();
        })
        .catch(error => {
                console.log(error);
        })
}

useEffect(() => {
        redirect();
    }, []); 

    
return(
        <div>
            <p>Redirecting to {name}</p>

        </div>
)
    }