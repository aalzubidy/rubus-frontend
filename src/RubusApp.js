import React, { useContext, useEffect } from 'react';
import HomeLogin from './components/HomeLogin';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext, AuthActionsContext } from './contexts/AuthContext';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

const RubusApp = (props) => {
  const authActions = useContext(AuthActionsContext);
  const token = useContext(AuthContext);

  return (
    // <div>
    //     {!token ? <HomeLogin /> : <Home />}
    // </div>
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
