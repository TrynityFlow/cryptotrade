import { Card, CardBody, CardHeader } from '@nextui-org/react';
import React from 'react';

interface Props {
  id: string;
  symbol: string;
  price: string;
}

export const TradeTicket = ({ id, symbol, price }: Props) => {
  return (
    <Card>
      <CardHeader>{symbol}</CardHeader>
      <CardBody></CardBody>
    </Card>
  );
};

interface WrapperProps extends React.PropsWithChildren {
  isLoading?: boolean;
}

export const TicketWrapper = ({ children, isLoading }: WrapperProps) => {
  if (isLoading) return <>Load</>;

  return <div className="flex max-w-lg flex-col gap-3">{children}</div>;
};
