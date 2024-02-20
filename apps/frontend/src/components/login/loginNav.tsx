import { Link } from '@nextui-org/react';
import Image from 'next/image';

export const LoginNav = () => {
  return (
    <Link href="/" color="foreground">
      <Image
        src="/logo.png"
        width={40}
        height={40}
        alt="logo"
        aria-hidden
        className="mr-2"
      />
      <p className="font-bold">Crypto Trade</p>
    </Link>
  );
};
