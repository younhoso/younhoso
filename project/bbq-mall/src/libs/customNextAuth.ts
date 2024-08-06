import { getSession, signIn } from 'next-auth/react';

import { Session } from 'next-auth';

import mem from 'mem';

export const getCachedSession: () => Promise<Session | null> = mem(
  async () => {
    const session = await getSession();

    if (session?.type === 'guest') {
      return session;
    }

    if (session?.accessToken && !session.shopByToken) {
      return await getRefreshSession();
    }

    return session;
  },
  { maxAge: 1000 },
);

export const getRefreshSession = mem(
  async () => {
    let session: Session | null = await getSession();

    if (!session?.refreshTokenInfo) {
      return null;
    }

    if (new Date(session.refreshTokenInfo.expiresAt) < new Date()) {
      return null;
    }

    const res = await signIn('refresh', {
      refreshToken: session?.refreshTokenInfo?.token,
      redirect: false,
    });

    if (!res?.ok) {
      return null;
    }

    session = await getSession();

    return session;
  },
  { maxAge: 10000 },
);
