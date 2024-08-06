import OrderSuccessItemMobile from './mobile/OrderSuccessItemMobile';
import _OrderSuccessItem from './pc/OrderSuccessItem';

type OrderSuccessItemP = typeof _OrderSuccessItem;

interface OrderSuccessItemType extends OrderSuccessItemP {
  Mobile: typeof OrderSuccessItemMobile;
}

const OrderSuccessItem = _OrderSuccessItem as OrderSuccessItemType;

OrderSuccessItem.Mobile = OrderSuccessItemMobile;

export default OrderSuccessItem;
