declare namespace Crypto {
  interface LoginFormData {
    username: string;
    password: string;
  }

  interface LoginContext {
    user: Request.User | undefined;
    updateUser: (user: Request.User) => void;
  }
}
