import { useContext } from 'react';
import { LoginContext } from '../../libs/loginContext';

export const WelcomeHeader = () => {
  const { user } = useContext(LoginContext);
  if (!user?.username) {
    return <></>;
  }

  return (
    <h2 className="text-2xl font-semibold">
      HI, {user?.username.toUpperCase()}!
    </h2>
  );
};
