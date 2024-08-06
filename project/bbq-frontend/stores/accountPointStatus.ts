import { selector } from 'recoil';

import { AccountAPI } from '@/apis';
import { buildStoreKey } from '@/utils';

import { sessionState } from './session';

// TODO: change to response type
export const accountPointStatusState = selector<
  | {
      currentPoint: number;
      expireExpectedPoint: number;
      expireScheduleDate: string;
    }
  | undefined
>({
  key: buildStoreKey(`accountPointStatusQuery`),
  get: async ({ get }) => {
    const session = get(sessionState);

    if (session && session.type === 'member') {
      try {
        return await AccountAPI.Point.getStatus();
      } catch (err) {
        console.error(err);
        return undefined;
      }
    } else {
      return undefined;
    }
  },
});
