import { LoginForm, LoginImage, LoginNav } from '../components';

export const LoginLayout = () => {
  return (
    <div className="bg-background h-screen overflow-hidden px-2 py-4 md:px-8">
      <LoginNav />
      <div className="flex h-full w-full items-center justify-start">
        <LoginImage />
        <LoginForm />
      </div>
    </div>
  );
};
