'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import Loading from './components/Loading';

type Props = {
  children?: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    if (pathname === '/login' && status === 'authenticated') {
      router.push('/');
    }
  }, [status]);

  if (status === 'loading') {
    return <Loading />;
  }

  return <SessionProvider>{children}</SessionProvider>;
};
