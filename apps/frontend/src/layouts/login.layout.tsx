import { LoginForm, LoginImage } from '../components';

export const LoginLayout = () => {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full w-full items-center justify-start">
        <LoginImage />
        <LoginForm />
      </div>
    </div>
  );
};
