import { add } from './add';
import { CouponEAPI } from './e';
import { CouponMembershipAPI } from './membership';
import { CouponPriceAPI } from './price';
import { CouponVoucherAPI } from './voucher';

export const CouponAPI = {
  add: add,
  E: CouponEAPI,
  Price: CouponPriceAPI,
  Membership: CouponMembershipAPI,
  Voucher: CouponVoucherAPI,
};
