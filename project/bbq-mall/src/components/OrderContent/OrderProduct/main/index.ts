import OrderProductMobile from './mobile/OrderProductMobile';
import _OrderProduct from './pc/OrderProduct';

type OrderProductP = typeof _OrderProduct;

interface OrderProductType extends OrderProductP {
  Mobile: typeof OrderProductMobile;
}

const OrderProduct = _OrderProduct as OrderProductType;

OrderProduct.Mobile = OrderProductMobile;

export default OrderProduct;
