import CardReviewMobile from './mobile/CardReviewMobile';
import _CardReview from './pc/CardReview';

type CardReviewP = typeof _CardReview;

interface CardReviewType extends CardReviewP {
  Mobile: typeof CardReviewMobile;
}

const CardReview = _CardReview as CardReviewType;

CardReview.Mobile = CardReviewMobile;

export default CardReview;
