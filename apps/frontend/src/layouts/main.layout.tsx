import { Nav } from '../components/ui';

export const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};
