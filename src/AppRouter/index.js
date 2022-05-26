import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as reactRouterDom from 'react-router-dom';
import NotFound from '../Components/NotFound';
import Paths from './Paths';
import Account from '../Components/Account';
import CheckHomepageAuth from './CheckHomepageAuth';
import Navbar from '../Components/Navbar';

// Supertokens
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import { EmailPasswordAuth } from "supertokens-auth-react/recipe/emailpassword";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}

        <Route path={Paths.home} element={<EmailPasswordAuth key='homepage' requireAuth={false} >
          <CheckHomepageAuth />
        </EmailPasswordAuth>} />
        <Route path={Paths.account} element={<EmailPasswordAuth key='account' >
          <Navbar />
          <Account />
        </EmailPasswordAuth>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
};

export default AppRouter;
