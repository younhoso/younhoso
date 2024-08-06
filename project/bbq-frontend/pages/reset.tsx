import { useEffect } from 'react';

import { NextPageContext } from 'next';

import { destroyCookie } from 'nookies';

export default function ResetPage() {
  useEffect(() => {
    destroyCookie(null, 'next-auth.session-token', { path: '/' });
    destroyCookie(null, 'next-auth.callback-url', { path: '/' });
    destroyCookie(null, 'next-auth.csrf-token', { path: '/' });
    destroyCookie(null, '__Secure-next-auth.session-token', { path: '/' });
    destroyCookie(null, '__Secure-next-auth.callback-url', { path: '/' });
    destroyCookie(null, '__Host-next-auth.csrf-token', { path: '/' });

    window.location.href = '/member/login';
  }, []);

  return <></>;
}

export async function getServerSideProps(context: NextPageContext) {
  destroyCookie(context, 'next-auth.session-token', { path: '/' });
  destroyCookie(context, 'next-auth.callback-url', { path: '/' });
  destroyCookie(context, 'next-auth.csrf-token', { path: '/' });
  destroyCookie(context, '__Secure-next-auth.session-token', { path: '/' });
  destroyCookie(context, '__Secure-next-auth.callback-url', { path: '/' });
  destroyCookie(context, '__Host-next-auth.csrf-token', { path: '/' });

  return {
    redirect: {
      destination: '/member/login',
      permanent: false,
    },
  };
}
