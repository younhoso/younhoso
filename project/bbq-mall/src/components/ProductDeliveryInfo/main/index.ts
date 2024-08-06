import ProductDeliveryInfoMobile from './mobile/ProductDeliveryInfoMobile';
import _ProductDeliveryInfo from './pc/ProductDeliveryInfo';

type ProductDeliveryInfoP = typeof _ProductDeliveryInfo;

interface ProductDeliveryInfoType extends ProductDeliveryInfoP {
  Mobile: typeof ProductDeliveryInfoMobile;
}

const ProductDeliveryInfo = _ProductDeliveryInfo as ProductDeliveryInfoType;

ProductDeliveryInfo.Mobile = ProductDeliveryInfoMobile;

export default ProductDeliveryInfo;
