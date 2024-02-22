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

export function useHistory() {
  return useQuery({
    queryKey: [OP_KEY],
    queryFn: async () => await getHistory(1, 1),
  });
}

export function useAssets() {
  return useQuery({ queryKey: [OP_KEY], queryFn: getAssets });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username, password }: Request.LoginData) =>
      await login(username, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OP_KEY] });
    },
  });
}

export function useRegister() {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username, password }: Request.LoginData) =>
      await register(username, password),
    onSuccess: () => {
      // queryClient.invalidateQueries({queryKey: []})
    },
  });
}

export function usePostOperation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      currency,
      amount,
      costPerAsset,
      sell,
    }: Request.OpData) =>
      await createOperation(currency, amount, costPerAsset, sell),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OP_KEY] });
    },
  });
}

export function useDelUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pass: string) => await deluser(pass),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_KEY, OP_KEY] });
    },
  });
}

export function useDelOperation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => await delOperation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OP_KEY] });
    },
  });
}
