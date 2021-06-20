import React from 'react';
import {BrowserRouter as Switch,Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const Routes = () => {
    return (
        <div>
        
         <Switch>
            <Route exact path="/" component={Register} />
            <Route exact path = "/login" component = {Login}/>
         </Switch>
      
        </div>
    )
}

export default Routes;