import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as reactRouterDom from 'react-router-dom';
import NotFound from '../Components/NotFound';
import Paths from './Paths';
import Account from '../Components/Account';
import ProjectUsers from '../Components/ProjectUsers';
import ProjectSettings from '../Components/ProjectSettings';
import CheckHomepageAuth from './CheckHomepageAuth';
import Navbar from '../Components/Navbar';

// Supertokens
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import { EmailPasswordAuth } from "supertokens-auth-react/recipe/emailpassword";

const AppRouter = () => {
  return (
    <Router>
      {window.location.pathname === '/' ? '' : <Navbar />}

      <Routes>
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}

        <Route path={Paths.home} element={<EmailPasswordAuth key='home' requireAuth={false} > <CheckHomepageAuth /> </EmailPasswordAuth>} />
        <Route path={Paths.account} element={<EmailPasswordAuth key='account' > <Account /> </EmailPasswordAuth>} />
        <Route path={Paths.projectUsers} element={<EmailPasswordAuth key='projectUsers' > <ProjectUsers /> </EmailPasswordAuth>} />
        <Route path={Paths.projectSettings} element={<EmailPasswordAuth key='projectSettings' > <ProjectSettings /> </EmailPasswordAuth>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
};

export default AppRouter;
