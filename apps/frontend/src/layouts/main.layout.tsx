import { Nav } from '../components/layout';

export const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};
