import OrderMethodMobile from './mobile/OrderMethodMobile';
import _OrderMethod from './pc/OrderMethod';

type OrderMethodP = typeof _OrderMethod;

interface OrderMethodType extends OrderMethodP {
  Mobile: typeof OrderMethodMobile;
}

const OrderMethod = _OrderMethod as OrderMethodType;

OrderMethod.Mobile = OrderMethodMobile;

export default OrderMethod;
