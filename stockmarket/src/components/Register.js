import React,{useState} from 'react';
import axios from "axios"
 import { Link,Redirect } from 'react-router-dom';
 import setauthtoken from '../utility';

const Register = () => {
  const[isAuthenticated,setisAuth] = useState(false);
    const [formdata,setformdata] = useState({
        name : "",
        email : "",
        password : "",
        password2 : "",


    });
    const {name,email,password,password2} = formdata;
    const onchange = (e) =>{
        setformdata({...formdata,[e.target.name] : e.target.value});
 }
 const onsubmit = async (e) => {
     e.preventDefault();
     try{
      axios.post('http://localhost:5000/registration', {
        name: name,
        email: email,
        password:password,
      })
      .then((response) => {
      
        if(window.localStorage.getItem('token'))
         localStorage.removeItem('token');
        setauthtoken(response.data);
        setisAuth(true);
        
      },(error) => {
        console.log(error);
      });
     }catch(err){
       console.log(err);
     }
     
 }
 if(isAuthenticated){
   return <Redirect to = "/portfolio"/>
 }
// useEffect(()=>{
//   let tok = window.localStorage.getItem('token');
//  if(tok){
//    console.log(tok);
 
  
 
//  }
 
//  },[isAuthenticated]);

    
    return (
      
        <div className = "register">
        <div className = "registration">
            <div className = " register_image">
                <img src = "https://www.teahub.io/photos/full/298-2987595_stock-market.png" alt = " stock market"/>
            </div>
            <div className = "form_content">
            <h1>Register</h1>
            <form onSubmit = {onsubmit}>
              
            <div className = "form-members">
            <label for="name"><b>Name</b></label>
          <input  type="text"  id="name" name="name" value = {name} onChange = {onchange} placeholder="Enter Name" />
            </div>
            <div className = "form-members">
            <label for="email"><b>Email</b></label>
          <input  type="email" id="email" name="email" value = {email} required onChange = {onchange} placeholder="Enter Email" />
            </div>
           <div className = "form-members">
           <label for="password"><b>Password</b></label>
          <input type="password"  id="password" name="password" required value = {password} onChange = {onchange} placeholder="Enter password"/>
           </div>
         
         <div className = "form-members">
         <label for="password2"><b> Confirm Password</b></label>
         <input type="password2"  id="password2" name="password2"  value = {password2} required onChange = {onchange} placeholder="Confirm password"/>
         
          </div>
          <div className = "form-members">
          <button type = "submit" className = "submit_button">Register</button>
          </div>
          </form>
         <p className="my-1">
        
        Don't have an account? <Link to="/login">Sign Up</Link>
      </p> 
          
          {/* <span><b>alrea member?</b></span><a href="/" ><button type="button" className="register"><b>Register Here</b></button></a> */}
         
  </div>
               
        </div>  
        </div>  
          )
}

export default Register