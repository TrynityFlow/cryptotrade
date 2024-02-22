import Axios from 'axios';

const URL = process.env.API_URL || 'http://localhost:4000/api/';

const axios = Axios.create({
  baseURL: URL,
  headers: {
    post: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  },
  timeout: 3000,
  withCredentials: true,
});

export async function getHistory({
  page = 1,
  count = 1,
}: Request.HistoryParams) {
  return await axios.get<Request.Operation[]>('operations', {
    params: {
      page: page,
      count: count,
    },
  });
}

export async function getProfile() {
  return await axios.get<Request.User>('users/me');
}

export async function getAssets() {
  return await axios.get<Request.Asset[]>('assets');
}

export async function login({ username, password }: Request.LoginData) {
  return await axios.post<Request.User>('auth/login', {
    username: username,
    password: password,
  });
}

export async function register({ username, password }: Request.LoginData) {
  return await axios.post<Request.User>('users', {
    username: username,
    password: password,
  });
}

export async function createOperation({
  amount,
  costPerAsset,
  currency,
  sell,
}: Request.OpData) {
  return await axios.post<Request.Operation>('users', {
    currency_id: currency,
    amount: amount,
    price: costPerAsset,
    sell: sell,
  });
}

export async function delOperation(id: number) {
  return await axios.delete<Request.Operation>(`operations/${id}`);
}

export async function deluser(pass: string) {
  return await axios.delete<Request.User>('users', {
    data: {
      password: pass,
    },
  });
}
