import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from './components/Landing'
import Signup from './components/Signup';
import BlackjackTable from './components/BlackJackTable';
import Login from './components/Login';
import { UserProvider } from './Context/UserContext';
import LandingAuth from './components/LandingAuth';


function App() {
  return (
    <UserProvider>
    <div className="App">
      <Router>
          <Switch>

              <Route exact path='/'>
                <Landing />
              </Route>
              <Route exact path='/home'>
                <LandingAuth />
              </Route>

              <Route exact path='/signup'>
                <Signup />
              </Route>

              <Route exact path='/table'>
                <BlackjackTable />
              </Route>
              
              <Route exact path='/login'>
                <Login />
              </Route>

          </Switch>
      </Router>
    </div>
    </UserProvider>
  );
}

export default App;
