import ReviewableItemMobile from './mobile/ReviewableItemMobile';
import _ReviewableItem from './pc/ReviewableItem';

type ReviewableItemP = typeof _ReviewableItem;

interface ReviewableItemType extends ReviewableItemP {
  Mobile: typeof ReviewableItemMobile;
}

const ReviewableItem = _ReviewableItem as ReviewableItemType;

ReviewableItem.Mobile = ReviewableItemMobile;

export default ReviewableItem;
