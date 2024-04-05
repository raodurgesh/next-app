'use client';

export const APP_Version = '123';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const session = useSession();
  return (
    <div className="m-2 flex flex-col gap-2">
      <h1 className="bold text-3xl">Profile</h1>
      <div>
        {session.data?.user ? <div> Signed In </div> : <div> Signed Out </div>}
      </div>
    </div>
  );
}
