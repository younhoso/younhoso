import OrderCouponMobile from './mobile/OrderCouponMobile';
import _OrderCoupon from './pc/OrderCoupon';

type OrderCouponP = typeof _OrderCoupon;

interface OrderCouponType extends OrderCouponP {
  Mobile: typeof OrderCouponMobile;
}

const OrderCoupon = _OrderCoupon as OrderCouponType;

OrderCoupon.Mobile = OrderCouponMobile;

export default OrderCoupon;
