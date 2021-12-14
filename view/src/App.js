import React, { Component } from 'react';
import { BrowserRouter as Switch, Router, Route } from 'react-router-dom';
import './App.css';
import Home from './home';

class App extends Component {
  render() {
  
    return (
      <Router>
      <div className="App">
       <Switch>
         <Route exact path="/" render={(props)=><Home/>}/>
       </Switch>
      </div>
    </Router> 
    );
  }
}

export default App;