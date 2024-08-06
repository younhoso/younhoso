import ProductPriceInfoMobile from './mobile/ProductPriceInfoMobile';
import _ProductPriceInfo from './pc/ProductPriceInfo';

type ProductPriceInfoP = typeof _ProductPriceInfo;

interface ProductPriceInfoType extends ProductPriceInfoP {
  Mobile: typeof ProductPriceInfoMobile;
}

const ProductPriceInfo = _ProductPriceInfo as ProductPriceInfoType;

ProductPriceInfo.Mobile = ProductPriceInfoMobile;

export default ProductPriceInfo;
