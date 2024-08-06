import RefundInfoMobile from './mobile/RefundInfoMobile';
import _RefundInfo from './pc/RefundInfo';

type RefundInfoP = typeof _RefundInfo;

interface RefundInfoType extends RefundInfoP {
  Mobile: typeof RefundInfoMobile;
}

const RefundInfo = _RefundInfo as RefundInfoType;

RefundInfo.Mobile = RefundInfoMobile;

export default RefundInfo;
