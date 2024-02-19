import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

const USER_KEY = 'user';
const OP_KEY = 'op';

export function useProfile() {
  return useQuery({ queryKey: [USER_KEY], queryFn: getProfile });
}

export function useHistory(page = 1, count = 10) {
  return useQuery({
    queryKey: [OP_KEY],
    queryFn: async () => await getHistory(page, count),
  });
}

export function useAssets() {
  return useQuery({ queryKey: [OP_KEY], queryFn: getAssets });
}

export function useLogin(name: string, pass: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await login(name, pass),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OP_KEY] });
    },
  });
}

export function useRegister(name: string, pass: string) {
  return useQuery({
    queryKey: [USER_KEY],
    queryFn: async () => await register(name, pass),
  });
}

export function usePostOperation(
  currency: string,
  amount: number,
  costPerAsset: number,
  sell: boolean,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () =>
      await createOperation(currency, amount, costPerAsset, sell),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OP_KEY] });
    },
  });
}

export function useDelUser(pass: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await deluser(pass),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_KEY, OP_KEY] });
    },
  });
}

export function useDelOperation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => await delOperation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OP_KEY] });
    },
  });
}
