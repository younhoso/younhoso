import ProductReviewMobile from './mobile/ProductReviewMobile';
import _ProductReview from './pc/ProductReview';

type ProductReviewP = typeof _ProductReview;

interface ProductReviewType extends ProductReviewP {
  Mobile: typeof ProductReviewMobile;
}

const ProductReview = _ProductReview as ProductReviewType;

ProductReview.Mobile = ProductReviewMobile;

export default ProductReview;
