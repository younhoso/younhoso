import { selector } from 'recoil';

import { CouponAPI } from '@/apis';
import { MembershipCoupon } from '@/types';
import { buildStoreKey } from '@/utils';

import { sessionState } from './session';

// TODO: change to response type
export const deliveryCouponMembershipCouponsState = selector<MembershipCoupon[] | undefined>({
  key: buildStoreKey(`deliveryCouponMembershipCouponsQuery`),
  get: async ({ get }) => {
    const session = get(sessionState);

    if (session && session.type === 'member') {
      try {
        return await CouponAPI.Membership.getList();
      } catch (err) {
        console.error(err);
        return undefined;
      }
    } else {
      return undefined;
    }
  },
});
