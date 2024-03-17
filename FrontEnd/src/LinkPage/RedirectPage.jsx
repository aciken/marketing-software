import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export function RedirectPage() {

        const { name, id, index, user} = useParams();
        const navigate = useNavigate();

        console.log(name, id, index, user);

        const redirect = async () => {
                await axios.post('http://localhost:3000/redirect', {
                        id,index,user
        })
        .then(res => {
                console.log(res.data);
                navigate(res.data);
        })
        .catch(error => {
                console.log(error);
        })
}

redirect();

    
return(
        <div>
            <p>Redirecting to {name}</p>

        </div>
)
    }