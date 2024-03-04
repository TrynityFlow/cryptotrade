import { useTopRanking } from '../../hooks/queryHooks';
import { TicketWrapper, TradeTicket } from './tradeTicket';

export const Ranking = () => {
  const { data, isLoading } = useTopRanking();
  return (
    <div className="flex w-full flex-col items-center justify-center pt-4">
      <h2 className="text-2xl font-bold">TOP 5 Crypto</h2>
      <TicketWrapper isLoading={isLoading}>
        {data?.data.data.map((val) => {
          return (
            <TradeTicket
              id={val.id}
              price={val.priceUsd}
              symbol={val.symbol}
              key={`card-${val.id}`}
            />
          );
        })}
      </TicketWrapper>
    </div>
  );
};
