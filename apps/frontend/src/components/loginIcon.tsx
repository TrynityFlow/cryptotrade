import {
  Avatar,
  AvatarIcon,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  NavbarItem,
} from '@nextui-org/react';
import { useProfile } from '../hooks/queryHooks';

export const LoginIcon = () => {
  const { isError } = useProfile();

  if (!isError) {
    return (
      <Dropdown>
        <DropdownTrigger>
          <NavbarItem>
            <Avatar
              size="sm"
              icon={<AvatarIcon />}
              classNames={{
                base: 'bg-primary-800 hover:cursor-pointer',
                icon: 'text-black/80',
              }}
            />
          </NavbarItem>
        </DropdownTrigger>
        <DropdownMenu aria-label="Account Actions">
          <DropdownItem key="settings">Settings</DropdownItem>
          <DropdownItem key="policy">Privacy Policy</DropdownItem>
          <DropdownItem key="logout" className="text-danger" color="danger">
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  return (
    <>
      <NavbarItem className="hidden lg:flex">
        <Link href="/login">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href="/register" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </>
  );
};
