import { CryptoList } from '../components';
import { WelcomeHeader } from '../components/main/welcomeHeader';
import { MainLayout } from '../layouts';

export function Index() {
  return (
    <MainLayout>
      <WelcomeHeader />
      
      <CryptoList />
    </MainLayout>
  );
}

export default Index;
