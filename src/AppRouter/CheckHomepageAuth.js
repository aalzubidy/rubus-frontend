import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import Homepage from '../Components/Homepage';
import { Navigate, useLocation } from 'react-router-dom';

const CheckHomepageAuth = () => {
  const { doesSessionExist } = useSessionContext();
  const location = useLocation;

  return (
    doesSessionExist ? <Navigate to='/account' from={location} replace /> : <Homepage />
  )
}

export default CheckHomepageAuth;
