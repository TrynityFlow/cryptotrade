import { Button } from '@nextui-org/react';

export const Submit = ({ children }: React.PropsWithChildren) => {
  return (
    <Button
      type="submit"
      color="success"
      className="w-full md:max-w-sm"
      size="lg"
    >
      {children}
    </Button>
  );
};
