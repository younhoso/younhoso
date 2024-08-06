import ReviewDetailItemMobile from './mobile/ReviewDetailItemMobile';
import _ReviewDetailItem from './pc/ReviewDetailItem';

type ReviewDetailItemP = typeof _ReviewDetailItem;

interface ReviewDetailItemType extends ReviewDetailItemP {
  Mobile: typeof ReviewDetailItemMobile;
}

const ReviewDetailItem = _ReviewDetailItem as ReviewDetailItemType;

ReviewDetailItem.Mobile = ReviewDetailItemMobile;

export default ReviewDetailItem;
