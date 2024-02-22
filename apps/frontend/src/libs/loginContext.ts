import React from 'react';

export const LoginContext = React.createContext<Crypto.LoginContext>({
  user: undefined,
  updateUser: (user: Request.User) => {
    return;
  },
});
