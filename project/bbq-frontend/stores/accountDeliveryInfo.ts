import { selector } from 'recoil';

import { AccountAPI } from '@/apis';
import { buildStoreKey } from '@/utils';

import { sessionState } from './session';

// TODO: change to response type
export const accountDeliveryInfoState = selector<
  | {
      membershipCouponCount: number;
      ecouponCount: number;
    }
  | undefined
>({
  key: buildStoreKey(`accountDeliveryInfoQuery`),
  get: async ({ get }) => {
    const session = get(sessionState);

    if (session && session.type === 'member') {
      try {
        return await AccountAPI.Member.getDeliveryInfo();
      } catch (err) {
        console.error(err);
        return undefined;
      }
    } else {
      return undefined;
    }
  },
});
