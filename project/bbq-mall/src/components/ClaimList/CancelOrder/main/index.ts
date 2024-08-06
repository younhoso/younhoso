import CancelOrderMobile from './mobile/CancelOrderMobile';
import _CancelOrder from './pc/CancelOrder';

type CancelOrderP = typeof _CancelOrder;

interface CancelOrderType extends CancelOrderP {
  Mobile: typeof CancelOrderMobile;
}

const CancelOrder = _CancelOrder as CancelOrderType;

CancelOrder.Mobile = CancelOrderMobile;

export default CancelOrder;
