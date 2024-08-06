import OrderAddressMobile from './mobile/OrderAddressMobile';
import _OrderAddress from './pc/OrderAddress';

type OrderAddressP = typeof _OrderAddress;

interface OrderAddressType extends OrderAddressP {
  Mobile: typeof OrderAddressMobile;
}

const OrderAddress = _OrderAddress as OrderAddressType;

OrderAddress.Mobile = OrderAddressMobile;

export default OrderAddress;
