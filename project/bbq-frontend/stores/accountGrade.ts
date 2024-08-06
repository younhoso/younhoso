import { selector } from 'recoil';

import { AccountAPI } from '@/apis';
import { Grade } from '@/types';
import { buildStoreKey } from '@/utils';

import { sessionState } from './session';

// TODO: change to response type
export const accountGradeState = selector<Grade | undefined>({
  key: buildStoreKey(`accountGrade`),
  get: async ({ get }) => {
    const session = get(sessionState);

    if (session && session.type === 'member') {
      try {
        return await AccountAPI.Member.getGrade();
      } catch (err) {
        console.error(err);
        return undefined;
      }
    } else {
      return undefined;
    }
  },
});
