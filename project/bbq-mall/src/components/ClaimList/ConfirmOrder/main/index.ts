import ConfirmOrderMobile from './mobile/ConfirmOrderMobile';
import _ConfirmOrder from './pc/ConfirmOrder';

type ConfirmOrderP = typeof _ConfirmOrder;

interface ConfirmOrderType extends ConfirmOrderP {
  Mobile: typeof ConfirmOrderMobile;
}

const ConfirmOrder = _ConfirmOrder as ConfirmOrderType;

ConfirmOrder.Mobile = ConfirmOrderMobile;

export default ConfirmOrder;
