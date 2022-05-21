import { useSessionContext } from 'supertokens-auth-react/recipe/session';

const TestPrivate = () => {
  let { userId } = useSessionContext();

  console.log(userId);

  return (
    <div>
      Hi from TestPrivate
    </div>
  );
};

export default TestPrivate;
