import { CheckLogin } from '../components/login/checkLogin';
import { TradeForm } from '../components/trade/tradeForm';
import { MainLayout } from '../layouts';

export default function TradePage() {
  return (
    <MainLayout>
      <CheckLogin />
      <TradeForm />
    </MainLayout>
  );
}
