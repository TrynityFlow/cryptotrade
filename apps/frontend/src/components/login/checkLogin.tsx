import { useRouter } from 'next/router';
import { useProfile } from '../../hooks/queryHooks';
import { useEffect } from 'react';
import { CircularProgress } from '@nextui-org/react';
export const CheckLogin = () => {
  const { isLoading, isError } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isError) router.push('/login');
  }, [isError, isLoading, router]);

  if (isLoading) return <CircularProgress label="Loading..." />;
  return <></>;
};
