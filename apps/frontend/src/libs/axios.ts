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

export async function getHistory(page: number, count: number) {
  return await axios.get('operations', {
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
  return await axios.get('assets');
}

export async function login(username: string, password: string) {
  return await axios.post<Request.User>('auth/login', {
    username: username,
    password: password,
  });
}

export async function register(username: string, password: string) {
  return await axios.post('users', {
    username: username,
    password: password,
  });
}

export async function createOperation(
  currency: string,
  amount: number,
  costPerAsset: number,
  sell: boolean,
) {
  return await axios.post('users', {
    currency_id: currency,
    amount: amount,
    price: costPerAsset,
    sell: sell,
  });
}

export async function delOperation(id: number) {
  return await axios.delete(`operations/${id}`);
}

export async function deluser(pass: string) {
  return await axios.delete('users', {
    data: {
      password: pass,
    },
  });
}
