import { LoginForm, LoginImage } from '../components';
import ModalObj from '../components/elements/Modal';
export const LoginLayout = () => {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full w-full items-center justify-start">
        <LoginImage />
        <LoginForm />
        <ModalObj />
      </div>
    </div>
  );
};
