// import { useContext, useEffect } from 'react';
// import { Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as reactRouterDom from 'react-router-dom';
// import { AuthContext, AuthActionsContext } from '../Contexts/AuthContext';
// import PrivateRoute from './PrivateRoute';
import NotFound from '../Components/NotFound';
import Homepage from '../Components/Homepage';
// import NewPost from '../Components/NewPost';
// import PostDetails from '../Components/PostDetails';
// import Login from '../Components/Login';
// import ManagePost from '../Components/ManagePost';
// import Navbar from '../Components/Navbar';
import Paths from './Paths';
import TestPrivate from '../Components/TestPrivate';

// Supertokens
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import { EmailPasswordAuth } from "supertokens-auth-react/recipe/emailpassword";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";

const AppRouter = () => {
  // Settings
  // const history = useHistory();

  // Authorization
  // const authActions = useContext(AuthActionsContext);
  // const { token } = useContext(AuthContext);

  // useEffect(() => {
  //   let isMounted = true;

  //   // Check if there is a refresh token in the cookies
  //   if (!token && isMounted) {
  //     authActions.renewToken().then((results) => {
  //       if (results) {
  //         history.push('/');
  //       }
  //     }).catch((e) => {
  //       return true;
  //       // console.log('No refresh token stored, all good, you don\'t need to do anything about it');
  //     })
  //   }

  //   return () => isMounted = false;
  // }, [token])

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}

        <Route path={Paths.home} element={
          <EmailPasswordAuth requireAuth={false} >
            <Homepage />
          </EmailPasswordAuth>
        } />
        <Route path={'/testPrivate'} element={
          <EmailPasswordAuth >
            <TestPrivate />
          </EmailPasswordAuth>
        } />
        <Route path={Paths.signout} element={<>
          <button onClick={async () => await signOut()}>Sign Out</button>
        </>} />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  )
};

export default AppRouter;
