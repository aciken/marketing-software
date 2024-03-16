import { useParams, useLocation } from "react-router-dom";

export function AffiliatePage() {

    const location = useLocation();
    const data = location.state.data; 
    console.log(data)



    return (
        <div>
            <h1>Affiliate Page</h1>
            <p>Link: {data.affiliateName}</p>
        </div>
    );
}