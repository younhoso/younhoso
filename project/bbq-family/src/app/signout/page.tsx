'use client';

import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function Signout() {
  useEffect(() => {
    signOut({
      callbackUrl: `${window.location.origin}/signout`,
    });
  });
  return <></>;
}
