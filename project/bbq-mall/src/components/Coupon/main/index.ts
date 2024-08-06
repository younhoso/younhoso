import CouponMobile from './mobile/CouponMobile';
import _Coupon from './pc/Coupon';

type CouponP = typeof _Coupon;

interface CouponType extends CouponP {
  Mobile: typeof CouponMobile;
}

const Coupon = _Coupon as CouponType;

Coupon.Mobile = CouponMobile;

export default Coupon;
