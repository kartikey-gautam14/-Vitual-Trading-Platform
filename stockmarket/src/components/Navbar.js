import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';


const Navbar = () => {
    return (
        <div className = "navbar" >
            
                    
                <div className = "navigation"> <Link to = "/funds">Funds</Link></div>
                <div className = "navigation"><Link to = "/portfolio">Portfolio</Link></div>
                <div className = "navigation"> <Link to = "/bought">Bought</Link></div>
                <div className = "navigation"> <Link to = "/sold">Transactions</Link></div>
               
                    
            
        

        </div>
    )
}

export default Navbar
