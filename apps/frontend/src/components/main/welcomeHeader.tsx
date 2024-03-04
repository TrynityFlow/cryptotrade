import { useContext } from 'react';
import { LoginContext } from '../../libs/loginContext';

export const WelcomeHeader = () => {
  const { user } = useContext(LoginContext);
  if (!user?.username) {
    return <></>;
  }

  return (
    <h2 className="mb-14 mt-4 text-center text-3xl font-semibold">
      HI, {user?.username.toUpperCase()}!
    </h2>
  );
};
