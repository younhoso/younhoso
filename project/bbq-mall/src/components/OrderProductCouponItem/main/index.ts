import OrderProductCouponItemMobile from './mobile/OrderProductCouponItemMobile';
import _OrderProductCouponItem from './pc/OrderProductCouponItem';

type OrderProductCouponItemP = typeof _OrderProductCouponItem;

interface OrderProductCouponItemType extends OrderProductCouponItemP {
  Mobile: typeof OrderProductCouponItemMobile;
}

const OrderProductCouponItem = _OrderProductCouponItem as OrderProductCouponItemType;

OrderProductCouponItem.Mobile = OrderProductCouponItemMobile;

export default OrderProductCouponItem;
