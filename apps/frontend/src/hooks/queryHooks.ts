import { useQuery, useMutation } from 'react-query';
import {
  createOperation,
  delOperation,
  deluser,
  getAssets,
  getHistory,
  getProfile,
  login,
  register,
} from '../libs/axios';
import { queryClient } from '../pages/_app';

const USER_KEY = 'user';
const OP_KEY = 'op';

export function useProfile() {
  return useQuery(USER_KEY, getProfile);
}

export function useHistory(page = 1, count = 10) {
  return useQuery(OP_KEY, async () => {
    await getHistory(page, count);
  });
}

export function useAssets() {
  return useQuery(OP_KEY, getAssets);
}

export function useLogin(name: string, pass: string) {
  return useMutation(async () => await login(name, pass), {
    onSuccess: () => {
      queryClient.invalidateQueries(OP_KEY);
    },
  });
}

export function useRegister(name: string, pass: string) {
  return useQuery(USER_KEY, async () => {
    await register(name, pass);
  });
}

export function usePostOperation(
  currency: string,
  amount: number,
  costPerAsset: number,
  sell: boolean,
) {
  return useMutation(
    async () => await createOperation(currency, amount, costPerAsset, sell),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(OP_KEY);
      },
    },
  );
}

export function useDelUser(pass: string) {
  return useMutation(async () => await deluser(pass), {
    onSuccess: () => {
      queryClient.invalidateQueries([USER_KEY, OP_KEY]);
    },
  });
}

export function useDelOperation() {
  return useMutation(delOperation, {
    onSuccess: () => {
      queryClient.invalidateQueries(OP_KEY);
    },
  });
}
