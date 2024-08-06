import ToTopMobile from './mobile/ToTopMobile';
import _ToTop from './pc/ToTop';

type ToTopP = typeof _ToTop;

interface ToTopType extends ToTopP {
  Mobile: typeof ToTopMobile;
}

const ToTop = _ToTop as ToTopType;

ToTop.Mobile = ToTopMobile;

export default ToTop;
