import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/Routes';

function App() {
  return (
    <Router>
    <div className="app">
      <div className = "app_left">
      <Switch>
        <Route exact path="/" component={Register} />
        <Route component = {Routes}/>
      </Switch>
      
      </div>
      <div className = "app_right">
      <Navbar />
      </div>
      
    </div>
    </Router>
  );
}

export default App;
