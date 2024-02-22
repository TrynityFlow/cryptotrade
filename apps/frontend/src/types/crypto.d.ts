declare namespace Crypto {
  interface LoginFormData {
    username: string;
    password: string;
  }

  interface RegisterFormData extends LoginFormData {
    repeat: string;
  }

  interface LoginContext {
    user: Request.User | undefined;
    updateUser: (user: Request.User) => void;
  }
}
