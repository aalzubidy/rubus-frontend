import React from 'react';
import HomeLogin from './components/HomeLogin';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

const RubusApp = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomeLogin} />
        <PrivateRoute exact path='/home'>
          <Home />
        </PrivateRoute>
        <Route render={() => <h1>Page not found :(</h1>} />
      </Switch>
    </Router>
  )
};

export default RubusApp;
