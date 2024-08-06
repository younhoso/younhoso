import OrderContentMobile from './mobile/OrderContentMobile';
import _OrderContent from './pc/OrderContent';

type OrderContentP = typeof _OrderContent;

interface OrderContentType extends OrderContentP {
  Mobile: typeof OrderContentMobile;
}

const OrderContent = _OrderContent as OrderContentType;

OrderContent.Mobile = OrderContentMobile;

export default OrderContent;
