import React, { useEffect, useState } from 'react';
import { useProfile } from '../hooks/queryHooks';

export const LoginContext = React.createContext<Crypto.LoginContext>({
  user: undefined,
  updateUser: (user: Request.User) => {
    return;
  },
});

export const LoginContextProvider = ({ children }: React.PropsWithChildren) => {
  const { data, isError } = useProfile();
  const [user, setUser] = useState<Request.User>();
  useEffect(() => {
    if (isError || !data) return;
    setUser(data.data);
  }, [data, isError]);
  return (
    <LoginContext.Provider value={{ user: user, updateUser: setUser }}>
      {children}
    </LoginContext.Provider>
  );
};
