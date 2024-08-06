import OrderBuyerMobile from './mobile/OrderBuyerMobile';
import _OrderBuyer from './pc/OrderBuyer';

type OrderBuyerP = typeof _OrderBuyer;

interface OrderBuyerType extends OrderBuyerP {
  Mobile: typeof OrderBuyerMobile;
}

const OrderBuyer = _OrderBuyer as OrderBuyerType;

OrderBuyer.Mobile = OrderBuyerMobile;

export default OrderBuyer;
