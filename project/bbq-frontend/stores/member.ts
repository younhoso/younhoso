import { selector } from 'recoil';

import { AccountAPI } from '@/apis';
import { GetAccountMemberAPIResponse } from '@/types';
import { buildStoreKey } from '@/utils';

import { sessionState } from './session';

export const memberState = selector<GetAccountMemberAPIResponse | null>({
  key: buildStoreKey(`memberStateQuery`),
  get: async ({ get }) => {
    const session = get(sessionState);

    if (session && session.type === 'member') {
      return await AccountAPI.Member.get();
    } else {
      return null;
    }
  },
});
