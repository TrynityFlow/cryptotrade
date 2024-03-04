import { Dispatch, useEffect } from 'react';
import { useSearchCrypto } from '../../hooks/queryHooks';
import { TicketWrapper, TradeTicket } from './tradeTicket';

interface Props {
  search: string;
}

export const SearchList = ({ search }: Props) => {
  const { query, state } = useSearchCrypto();
  const { data, isLoading } = query;
  const [, setPhrase] = state;

  useEffect(() => {
    const fn = setPhrase as Dispatch<string>;
    fn(search);
  }, [search, setPhrase]);

  return (
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
  );
};
