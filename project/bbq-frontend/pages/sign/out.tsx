import Lottie from 'lottie-react';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

import { NextPageContext } from 'next';
import { useRouter } from 'next/router';

import { destroyCookie } from 'nookies';

import { chibbackIcon } from '@/constant/chibbackIcon';
import { useSidebarCart } from '@/stores';

import { LoadingMobileStyled } from '../ars';

export default function SignOut() {
  const { reset: resetSidebarCart } = useSidebarCart();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    (async () => {
      destroyCookie(null, 'next-auth.session-token');
      destroyCookie(null, 'next-auth.callback-url');
      destroyCookie(null, 'next-auth.csrf-token');
      destroyCookie(null, '__Secure-next-auth.session-token');
      destroyCookie(null, '__Secure-next-auth.callback-url');
      destroyCookie(null, '__Host-next-auth.csrf-token');
      resetSidebarCart();
      setTimeout(async () => {
        await signOut();
        window.location.replace('/');
      }, 500);
    })();
  }, []);
  return (
    <LoadingMobileStyled>
      <Lottie animationData={chibbackIcon} loop autoplay />
    </LoadingMobileStyled>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  destroyCookie(context, 'next-auth.session-token', { path: '/' });
  destroyCookie(context, 'next-auth.callback-url', { path: '/' });
  destroyCookie(context, 'next-auth.csrf-token', { path: '/' });
  destroyCookie(context, '__Secure-next-auth.session-token', { path: '/' });
  destroyCookie(context, '__Secure-next-auth.callback-url', { path: '/' });
  destroyCookie(context, '__Host-next-auth.csrf-token', { path: '/' });
  return { props: {} };
}
