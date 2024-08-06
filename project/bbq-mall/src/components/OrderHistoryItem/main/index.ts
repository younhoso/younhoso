import OrderHistoryItemMobile from './mobile/OrderHistoryItemMobile';
import _OrderHistoryItem from './pc/OrderHistoryItem';

type OrderHistoryItemP = typeof _OrderHistoryItem;

interface OrderHistoryItemType extends OrderHistoryItemP {
  Mobile: typeof OrderHistoryItemMobile;
}

const OrderHistoryItem = _OrderHistoryItem as OrderHistoryItemType;

OrderHistoryItem.Mobile = OrderHistoryItemMobile;

export default OrderHistoryItem;
