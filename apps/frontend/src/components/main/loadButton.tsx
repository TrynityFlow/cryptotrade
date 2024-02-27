import { Dispatch, SetStateAction } from 'react';
import { Submit } from '../ui/inputs/submit';

interface Props {
  limit: number;
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  isLoading?: boolean;
}

export const LoadButton = ({
  limit,
  offset,
  setOffset,
  isLoading = false,
}: Props) => {
  const clickHandler = () => {
    setOffset(offset + limit);
  };

  return (
    <Submit onClick={clickHandler} isLoading={isLoading}>
      Load More
    </Submit>
  );
};
