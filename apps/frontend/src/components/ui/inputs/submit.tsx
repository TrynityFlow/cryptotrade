import { Button } from '@nextui-org/react';

interface Props extends React.PropsWithChildren {
  isLoading?: boolean;
  className?: string;
}

export const Submit = ({ children, isLoading = false, className }: Props) => {
  return (
    <Button
      type="submit"
      color="success"
      className={`w-full md:max-w-sm ${className}`}
      size="lg"
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
};
