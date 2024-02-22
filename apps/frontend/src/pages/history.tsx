import { useContext } from 'react';
import { MainLayout } from '../layouts';
import { LoginContext } from '../libs/loginContext';

export default function HistoryPage() {
  const { user } = useContext(LoginContext);

  return <MainLayout>{user?.username}</MainLayout>;
}
