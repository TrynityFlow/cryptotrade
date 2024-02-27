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

  type Crypto = {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
  };

  type CryptoArray = {
    data: Crypto[];
  };
}
