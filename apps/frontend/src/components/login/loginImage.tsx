import { LoginNav } from './loginNav';

export const LoginImage = () => {
  return (
    <div className="bg-background hidden h-screen w-7/12 flex-col items-center justify-center md:flex">
      <LoginNav />
      <p className="mt-4 w-8/12 px-8 py-2 text-center text-xl font-medium">
        &quot;Every industry has actors good and bad. Crypto is no exception.
        The best actors should be left to innovate, while the worst should be
        held to account.&quot;
      </p>
    </div>
  );
};
