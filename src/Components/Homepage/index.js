import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import './homepage.scss';

const Homepage = () => {
  let { userId, accessTokenPayload } = useSessionContext();

  console.log(userId);
  console.log(accessTokenPayload);

  return (
    <div>
      Hi from homepage {userId}
    </div>
  );
};

export default Homepage;
