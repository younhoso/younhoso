import { getSession } from 'next-auth/react';

import { Session } from 'next-auth';

import { selector } from 'recoil';

import { buildStoreKey } from '@/utils';

export const sessionState = selector<Session | null>({
  key: buildStoreKey(`sessionStateQuery`),
  get: async () => {
    const session = await getSession();
    if (session) {
      return session;
    } else {
      return null;
    }
  },
});
