import WriteReviewMobile from './mobile/WriteReviewMobile';
import _WriteReview from './pc/WriteReview';

type WriteReviewP = typeof _WriteReview;

interface WriteReviewType extends WriteReviewP {
  Mobile: typeof WriteReviewMobile;
}

const WriteReview = _WriteReview as WriteReviewType;

WriteReview.Mobile = WriteReviewMobile;

export default WriteReview;
