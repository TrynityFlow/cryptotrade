import { Nav } from '../components/ui';

export const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Nav />
      <div className="p-4 md:px-32 md:py-12">{children}</div>
    </>
  );
};
