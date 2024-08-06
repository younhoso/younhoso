import StarRatingMobile from './mobile/StarRatingMobile';
import _StarRating from './pc/StarRating';

type StarRatingP = typeof _StarRating;

interface StarRatingType extends StarRatingP {
  Mobile: typeof StarRatingMobile;
}

const StarRating = _StarRating as StarRatingType;

StarRating.Mobile = StarRatingMobile;

export default StarRating;
