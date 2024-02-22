import { useContext, useEffect } from 'react';
import { useProfile } from '../hooks/queryHooks';
import { MainLayout } from '../layouts';
import { LoginContext } from '../libs/loginContext';

export function Index() {
  const { data, isError } = useProfile();
  const { updateUser } = useContext(LoginContext);
  useEffect(() => {
    if (isError || !data) return;
    updateUser(data.data);
  }, [data, isError, updateUser]);

  return <MainLayout></MainLayout>;
}

export default Index;
