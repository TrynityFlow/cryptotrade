import { CheckLogin } from '../components/login/checkLogin';
import { MainLayout } from '../layouts';

export default function WalletPage() {
  return (
    <MainLayout>
      <CheckLogin />
    </MainLayout>
  );
}
