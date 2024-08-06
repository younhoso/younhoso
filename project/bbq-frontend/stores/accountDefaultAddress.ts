import { selector } from 'recoil';

import { AccountAPI } from '@/apis';
import { Address } from '@/types';
import { buildStoreKey, parseApiError } from '@/utils';

import { sessionState } from './session';

// TODO: change to response type
export const accountDefaultAddressState = selector<Address | undefined | null>({
  key: buildStoreKey(`accountDefaultAddressQuery`),
  get: async ({ get }) => {
    const session = get(sessionState);

    if (session) {
      try {
        return await AccountAPI.Address.get();
      } catch (err) {
        if (parseApiError(err).code === 'ELEMENT_NOT_FOUND') {
          return null;
        } else {
          throw err;
        }
      }
    } else {
      return null;
    }
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});
