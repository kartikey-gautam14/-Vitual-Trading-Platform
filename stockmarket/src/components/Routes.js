import React from 'react';
import {BrowserRouter as Switch,Route } from 'react-router-dom';
import Login from './Login';

const Routes = () => {
    return (
        <div>
        
             <Switch>
                 <Route exact path = "/login" component = {Login}/>
             </Switch>
      
        </div>
    )
}

export default Routes;