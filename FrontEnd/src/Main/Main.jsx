import { useLocation } from "react-router-dom";

export function Main(){

    const location = useLocation();
    const id = location.state.id;
    console.log(id)

    return(
        <div className="main">
        <h1>MAIN PAGE</h1>
        </div>
    )
}