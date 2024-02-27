import { User } from '@nextui-org/react';
import { getIcon } from '../../libs/axios';

interface Props {
  item: Request.Crypto;
}

export const ListElement = ({ item }: Props) => {
  return (
    <User
      avatarProps={{
        radius: 'lg',
        src: getIcon(item.symbol),
        className: 'bg-transparent',
      }}
      name={item.name}
      description={item.symbol}
    />
  );
};
