import ReviewedItemMobile from './mobile/ReviewedItemMobile';
import _ReviewedItem from './pc/ReviewedItem';

type ReviewedItemP = typeof _ReviewedItem;

interface ReviewedItemType extends ReviewedItemP {
  Mobile: typeof ReviewedItemMobile;
}

const ReviewedItem = _ReviewedItem as ReviewedItemType;

ReviewedItem.Mobile = ReviewedItemMobile;

export default ReviewedItem;
