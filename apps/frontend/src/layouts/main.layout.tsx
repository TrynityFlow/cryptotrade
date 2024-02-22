'use client';
import { useContext, useEffect } from 'react';
import { Nav } from '../components/layout';
import { LoginContext } from '../libs/loginContext';
import { useStorage } from '../hooks/useStorage';

export const MainLayout = ({ children }: React.PropsWithChildren) => {
  const { user, updateUser } = useContext(LoginContext);
  const [u, setUser] = useStorage('user-name');
  const [id, setId] = useStorage('user-id');

  useEffect(() => {
    if (user) {
      setUser(user.username);
      setId(user.id);
      return;
    }

    updateUser({ id: parseInt(id), username: u });
  }, [id, setId, setUser, u, updateUser, user]);
  return (
    <>
      <Nav />
      {children}
    </>
  );
};
