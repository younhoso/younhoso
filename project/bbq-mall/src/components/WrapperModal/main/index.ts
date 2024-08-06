import WrapperModalMobile from './mobile/WrapperModalMobile';
import _WrapperModal from './pc/WrapperModal';

type WrapperModalP = typeof _WrapperModal;

interface WrapperModalType extends WrapperModalP {
  Mobile: typeof WrapperModalMobile;
}

const WrapperModal = _WrapperModal as WrapperModalType;

WrapperModal.Mobile = WrapperModalMobile;

export default WrapperModal;
