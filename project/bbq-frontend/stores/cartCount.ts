import { selector } from 'recoil';

import { CartAPI } from '@/apis';
import { buildStoreKey } from '@/utils';

import { sessionState } from './session';

// TODO: change to response type
export const cartCountState = selector<{ cartCount: number } | undefined>({
  key: buildStoreKey(`cartCountQuery`),
  get: async ({ get }) => {
    const session = get(sessionState);

    if (session) {
      try {
        return await CartAPI.getCount();
      } catch (err) {
        console.error(err);
        return undefined;
      }
    } else {
      return undefined;
    }
  },
});
