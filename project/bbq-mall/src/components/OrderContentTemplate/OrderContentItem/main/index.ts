import OrderContentItemMobile from './mobile/OrderContentItemMobile';
import _OrderContentItem from './pc/OrderContentItem';

type OrderContentItemP = typeof _OrderContentItem;

interface OrderContentItemType extends OrderContentItemP {
  Mobile: typeof OrderContentItemMobile;
}

const OrderContentItem = _OrderContentItem as OrderContentItemType;

OrderContentItem.Mobile = OrderContentItemMobile;

export default OrderContentItem;
