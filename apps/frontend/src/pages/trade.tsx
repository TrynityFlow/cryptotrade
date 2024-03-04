import { CheckLogin } from '../components/login/checkLogin';
import { TradeList } from '../components/trade/tradeList';
import { MainLayout } from '../layouts';

export default function TradePage() {
  return (
    <MainLayout>
      <CheckLogin />
      <TradeList />
    </MainLayout>
  );
}
