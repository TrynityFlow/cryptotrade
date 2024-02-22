import { RegisterForm } from '../components/register/registerForm';
import { LoginLayout } from '../layouts';

export default function RegisterPage() {
  return (
    <LoginLayout>
      <RegisterForm />
    </LoginLayout>
  );
}
