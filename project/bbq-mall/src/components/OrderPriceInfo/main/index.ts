import OrderPriceInfoMobile from './mobile/OrderPriceInfoMobile';
import _OrderPriceInfo from './pc/OrderPriceInfo';

type OrderPriceInfoP = typeof _OrderPriceInfo;

interface OrderPriceInfoType extends OrderPriceInfoP {
  Mobile: typeof OrderPriceInfoMobile;
}

const OrderPriceInfo = _OrderPriceInfo as OrderPriceInfoType;

OrderPriceInfo.Mobile = OrderPriceInfoMobile;

export default OrderPriceInfo;
