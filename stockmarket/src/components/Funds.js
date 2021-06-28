import axios from 'axios';
import React,{useState,useEffect} from 'react';
import jwt_decode from 'jwt-decode';

const Funds = () => {
    const [wallet,setWallet] = useState(0);
    const [email,setemail] = useState("");
    useEffect( () => {
        const tokening = () => {
         var token = window.localStorage.getItem('token');
            
         var decoded = jwt_decode(token);
            setemail(decoded.users.email);
                }
                
                
                tokening();
                

    }
    
    
    ,[])

    useEffect(()=>{
        const getwallet = () =>{
            axios.post("http://localhost:5000/getwallet",{email:email})
            .then(response => {console.log(response);
                setWallet(response.data.wallet)});
        }
        if(email !== "")
        getwallet();

    },[email])

    return (
        <div>
          Your balance is {wallet}
            
        </div>
    )
}

export default Funds
