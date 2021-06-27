import React from 'react';
import {BrowserRouter as Switch,Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Portfolio from './Portfolio';
import Funds from './Funds';
import Transactions from './Transactions';
import Bought from './Bought';

const Routes = () => {
    return (
        <div>
        
         <Switch>
            <Route exact path = "/portfolio" component = {Portfolio}/>
            <Route exact path="/" component={Register} />
            <Route exact path = "/login" component = {Login}/>
            <Route exact path = "/funds" component = {Funds}/>
            <Route exact path = "/bought" component = {Bought}/>
            <Route exact path = "/sold" component = {Transactions}/>
         </Switch>
      
        </div>
    )
}

export default Routes;