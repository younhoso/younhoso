import ProductOptionPayInfoMobile from './mobile/ProductOptionPayInfoMobile';
import _ProductOptionPayInfo from './pc/ProductOptionPayInfo';

type ProductOptionPayInfoP = typeof _ProductOptionPayInfo;

interface ProductOptionPayInfoType extends ProductOptionPayInfoP {
  Mobile: typeof ProductOptionPayInfoMobile;
}

const ProductOptionPayInfo = _ProductOptionPayInfo as ProductOptionPayInfoType;

ProductOptionPayInfo.Mobile = ProductOptionPayInfoMobile;

export default ProductOptionPayInfo;
