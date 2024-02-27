import { useContext, useEffect } from 'react';
import { MainLayout } from '../layouts';
import { LoginContext } from '../libs/loginContext';
import { useRouter } from 'next/router';

export default function TradePage() {
  const { user } = useContext(LoginContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [router, user]);

  return <MainLayout></MainLayout>;
}
