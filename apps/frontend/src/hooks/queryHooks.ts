import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import {
  createOperation,
  delOperation,
  deluser,
  getAllCrypto,
  getAssets,
  getCrypto,
  getHistory,
  getProfile,
  login,
  register,
} from '../libs/axios';
import { useState } from 'react';

const USER_KEY = 'user';
const OP_KEY = 'op';
const CRYPTO_KEY = 'crypto';

export function useProfile() {
  return useQuery({ queryKey: [USER_KEY], queryFn: getProfile, retry: false });
}

export function useHistory() {
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);

  return {
    query: useQuery({
      queryKey: [OP_KEY, count, page],
      queryFn: async () => await getHistory({ count: count, page: page }),
    }),
    countState: [count, setCount],
    pageState: [page, setPage],
  };
}

export function useAssets() {
  return useQuery({ queryKey: [OP_KEY], queryFn: getAssets });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Request.LoginData) => await login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OP_KEY] });
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Request.LoginData) => await register(data),
    mutationKey: [USER_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_KEY] });
    },
  });
}

export function usePostOperation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Request.OpData) => await createOperation(data),
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

export function useGetAllCrypto() {
  return useInfiniteQuery({
      queryKey: [CRYPTO_KEY],
      queryFn: getAllCrypto,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    });
}

export function useGetCrypto() {
  const [id, setId] = useState('');
  return {
    query: useQuery({
      queryKey: [id],
      queryFn: async () => await getCrypto(id),
    }),
    state: [id, setId],
  };
}
