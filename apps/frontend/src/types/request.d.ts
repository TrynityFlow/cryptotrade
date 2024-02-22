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

  type User = {
    id: number;
    username: string;
  };
}
