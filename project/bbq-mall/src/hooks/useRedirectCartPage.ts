import { useEffect } from 'react';

import { redirect, usePathname } from 'next/navigation';

import { useHandleIsSignIn } from './useHandleIsSignIn';

export const useRedirectCartPage = () => {
  const pathname = usePathname();
  const { isSignIn, isLoading } = useHandleIsSignIn();
  const route = `/cart/${isSignIn ? 'user' : 'guest'}`;

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (
      (isSignIn && /\guest/.test(pathname)) ||
      (!isSignIn && /\user/.test(pathname)) ||
      !/\/cart\/user|\/cart\/guest/.test(pathname)
    ) {
      redirect(route);
    }
  }, [pathname, isSignIn, isLoading]);
};
