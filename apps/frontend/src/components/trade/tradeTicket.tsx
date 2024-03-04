import { Card, CardBody, CardHeader, Image, Skeleton } from '@nextui-org/react';
import React from 'react';
import { getIcon } from '../../libs/axios';

interface Props {
  id: string;
  symbol: string;
  price: string;
}

export const TradeTicket = ({ id, symbol, price }: Props) => {
  const imgUrl = getIcon(symbol);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return (
    <Card className="w-full px-2">
      <CardHeader className="flex w-full items-center gap-x-3 text-xl font-semibold">
        <Image src={imgUrl} alt={`${id} icon`} width={50} />
        <header>{symbol}</header>
        <p className="text-medium ml-auto">
          {formatter.format(parseFloat(price))}
        </p>
      </CardHeader>
      <CardBody>BUY SELL</CardBody>
    </Card>
  );
};

interface WrapperProps extends React.PropsWithChildren {
  isLoading?: boolean;
}

export const TicketWrapper = ({ children, isLoading }: WrapperProps) => {
  if (isLoading)
    return (
      <div className="flex w-full max-w-[300px] items-center gap-3 p-4">
        <div>
          <Skeleton className="flex h-12 w-12 rounded-full" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>
    );

  return (
    <div className="flex w-full max-w-md flex-col gap-4 p-4 md:w-1/4">
      {children}
    </div>
  );
};
