import OrderDetailMobile from './mobile/OrderDetailMobile';
import _OrderDetail from './pc/OrderDetail';

type OrderDetailP = typeof _OrderDetail;

interface OrderDetailType extends OrderDetailP {
  Mobile: typeof OrderDetailMobile;
}

const OrderDetail = _OrderDetail as OrderDetailType;

OrderDetail.Mobile = OrderDetailMobile;

export default OrderDetail;
