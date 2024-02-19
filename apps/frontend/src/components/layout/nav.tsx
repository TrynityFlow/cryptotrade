import * as React from 'react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@cryptotrade/ui-components';
import Image from 'next/image';

export function Nav() {
  return (
    <nav className="bg-nav border-accent fixed left-0 top-0 w-full border-b-[1px] bg-opacity-70 px-16 py-4 shadow-md backdrop-blur-sm backdrop-grayscale">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="mr-8 hidden sm:block">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink>
                <Image
                  src="/logo.png"
                  alt="logo"
                  aria-hidden
                  width={40}
                  height={40}
                />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/wallet" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                My Wallet
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/history" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                History
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
