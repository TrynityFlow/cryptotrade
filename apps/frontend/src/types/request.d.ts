declare namespace Request {
  interface LoginData {
    username: string;
    password: string;
  }

  interface OpData {
    currency: string;
    amount: number;
    costPerAsset: number;
    sell: boolean;
  }

  interface HistoryParams {
    page?: number;
    count?: number;
  }

  type Operation = {
    id: number;
  };
  type Asset = {
    symbol: string;
  };

  type User = {
    id: number;
    username: string;
  };
}
