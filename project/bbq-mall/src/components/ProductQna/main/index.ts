import ProductQnaMobile from './mobile/ProductQnaMobile';
import _ProductQna from './pc/ProductQna';

type ProductQnaP = typeof _ProductQna;

interface ProductQnaType extends ProductQnaP {
  Mobile: typeof ProductQnaMobile;
}

const ProductQna = _ProductQna as ProductQnaType;

ProductQna.Mobile = ProductQnaMobile;

export default ProductQna;
