import { useNavigate, useParams } from 'react-router-dom';

export function RedirectPage() {

        const { affiliateName, extension } = useParams();
        const navigate = useNavigate();
    
return(
        <div>
            <p>Redirecting to {affiliateName}</p>
            <p>Extension: {extension}</p>
        </div>
)
    }