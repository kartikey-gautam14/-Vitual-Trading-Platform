import React,{useState} from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
    const [formdata,setformdata] = useState({
        email:"",
        password:"",
    })
    const {email,password} = formdata;
     const onchange = (e) =>{
         setformdata(...formdata,[e.target.name] = e.target.value);
     }
    return (
        <div className = "login">
        <div className = "login_component">
            <div className = " register_image">
                <img src = "https://www.teahub.io/photos/full/298-2987595_stock-market.png" alt = " login stock market"/>
            </div>
            <div className = "form_content">
            <h1>Login into your account</h1>
            <form>
              
            
            <div className = "form-members">
            <label for="email"><b>Email</b></label>
          <input  type="email" id="email" name="email" value = {email} required onChange = {onchange} placeholder="Enter Email" />
            </div>
           <div className = "form-members">
           <label for="password"><b>Password</b></label>
          <input type="password"  id="password" name="password" required value = {password} onChange = {onchange} placeholder="Enter password"/>
           </div>
         
         
          <div className = "form-members">
          <button type = "submit" className = "submit_button">Login</button>
          </div>
          </form>
         <p className="my-1">
        
        Don't have an account? <Link to= "/">Sign Up</Link>
      </p> 
          
          {/* <span><b>alrea member?</b></span><a href="/" ><button type="button" className="register"><b>Register Here</b></button></a> */}
         
  </div>
               
        </div>  
        </div>  
    )
}

export default Login;