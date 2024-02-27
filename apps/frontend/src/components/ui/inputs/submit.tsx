import { Button } from '@nextui-org/react';
import { MouseEventHandler } from 'react';

interface Props extends React.PropsWithChildren {
  isLoading?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Submit = ({
  children,
  isLoading = false,
  className,
  onClick,
}: Props) => {
  return (
    <Button
      type="submit"
      color="success"
      className={`w-full md:max-w-sm ${className}`}
      size="lg"
      onClick={onClick}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
};
