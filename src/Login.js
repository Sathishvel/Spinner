import {state, actions } from "./store/store";
import { useNavigate } from 'react-router-dom';
const Login=()=>{
    
    let navigate = useNavigate();
    const auth=async()=>{
        await actions.auth();
        navigate("/memberinfo");
    }
    return(
        <div> 
            <button onClick={()=>auth()}>Login</button>
            <button onClick={()=>actions.addContact()}>Add Contact</button>
        </div>
    )
}

export default Login;