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
  try {
    return await axios.get('operations', {
      params: {
        page: page,
        count: count,
      },
    });
  } catch (error) {
    return error;
  }
}

export async function getProfile() {
  try {
    return await axios.get('users/me');
  } catch (error) {
    return error;
  }
}

export async function getAssets() {
  try {
    return await axios.get('assets');
  } catch (error) {
    return error;
  }
}

export async function login(username: string, password: string) {
  try {
    return await axios.post('auth/login', {
      username: username,
      password: password,
    });
  } catch (error) {
    return error;
  }
}

export async function register(username: string, password: string) {
  try {
    return await axios.post('users', {
      username: username,
      password: password,
    });
  } catch (error) {
    return error;
  }
}

export async function createOperation(
  currency: string,
  amount: number,
  costPerAsset: number,
  sell: boolean,
) {
  try {
    return await axios.post('users', {
      currency_id: currency,
      amount: amount,
      price: costPerAsset,
      sell: sell,
    });
  } catch (error) {
    return error;
  }
}

export async function delOperation(id: number) {
  try {
    return await axios.delete(`operations/${id}`);
  } catch (error) {
    return error;
  }
}

export async function deluser(pass: string) {
  try {
    return await axios.delete('users', {
      data: {
        password: pass,
      },
    });
  } catch (error) {
    return error;
  }
}
