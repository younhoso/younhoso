// 자동으로 생성된 파일입니다. 수정하지 마세요.
import OrderAddress from './OrderAddress';
import OrderBuyer from './OrderBuyer';
import OrderCoupon from './OrderCoupon';
import OrderMethod from './OrderMethod';
import OrderPoint from './OrderPoint';
import OrderProduct from './OrderProduct';
import OrderTerms from './OrderTerms';
import _OrderContent from './main';

type OrderContentP = typeof _OrderContent;

interface OrderContentType extends OrderContentP {
  OrderAddress: typeof OrderAddress;
  OrderBuyer: typeof OrderBuyer;
  OrderCoupon: typeof OrderCoupon;
  OrderMethod: typeof OrderMethod;
  OrderPoint: typeof OrderPoint;
  OrderProduct: typeof OrderProduct;
  OrderTerms: typeof OrderTerms;
}

const OrderContent = _OrderContent as OrderContentType;

OrderContent.OrderAddress = OrderAddress;
OrderContent.OrderBuyer = OrderBuyer;
OrderContent.OrderCoupon = OrderCoupon;
OrderContent.OrderMethod = OrderMethod;
OrderContent.OrderPoint = OrderPoint;
OrderContent.OrderProduct = OrderProduct;
OrderContent.OrderTerms = OrderTerms;

export default OrderContent;
