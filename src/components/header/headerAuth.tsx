'use client';
import {
  Avatar,
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react';
import * as actions from '@/actions';
import { useSession } from 'next-auth/react';
export default function HeaderAuth() {
  const session = useSession();
  const user = session?.data?.user;

  if (session.status === 'loading') {
    return null;
  }

  if (user) {
    return (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={user?.image || ''} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <form action={actions.signOut}>
              <Button type="submit">Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    return (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="primary" variant="flat">
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }
}
