import OrderPointMobile from './mobile/OrderPointMobile';
import _OrderPoint from './pc/OrderPoint';

type OrderPointP = typeof _OrderPoint;

interface OrderPointType extends OrderPointP {
  Mobile: typeof OrderPointMobile;
}

const OrderPoint = _OrderPoint as OrderPointType;

OrderPoint.Mobile = OrderPointMobile;

export default OrderPoint;
