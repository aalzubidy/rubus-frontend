import React, { useContext } from 'react';
import HomeLogin from './components/HomeLogin';
import Home from './components/Home';
import AccountSettings from './components/AccountSettings';
import PrivateRoute from './components/PrivateRoute';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Navbar from './Navbar';
import { AuthContext } from './contexts/AuthContext';

const RubusApp = () => {
  const { token } = useContext(AuthContext);

  return (
      <Router>
      {token ? <Navbar /> : ''}
        <Switch>
          <Route exact path='/' component={HomeLogin} />
          <PrivateRoute exact path='/home'>
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path='/accountSettings'>
            <AccountSettings />
          </PrivateRoute>
          <Route render={() => <h1>Page not found :(</h1>} />
        </Switch>
      </Router>
  )
};

export default RubusApp;
