export type User = {
  id: number;
  username: string;
};

export type Operation = {
  id: number;
  user_id: number;
  currency_id: string;
  sell: boolean;
  amount: number;
  price: number;
  ts: string;
};

export type Balance = {
  symbol: string,
  balance: number;
  amount: number;
  avg_sell: number;
  avg_buy: number;
};
