import { useContext } from 'react';
import { MainLayout } from '../layouts';
import { LoginContext } from '../libs/loginContext';

export function Index() {
  const { user } = useContext(LoginContext);

  return <MainLayout>{user?.username}</MainLayout>;
}

export default Index;
