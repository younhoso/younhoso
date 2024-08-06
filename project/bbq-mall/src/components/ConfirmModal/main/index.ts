import ConfirmModalMobile from './mobile/ConfirmModalMobile';
import _ConfirmModal from './pc/ConfirmModal';

type ConfirmModalP = typeof _ConfirmModal;

interface ConfirmModalType extends ConfirmModalP {
  Mobile: typeof ConfirmModalMobile;
}

const ConfirmModal = _ConfirmModal as ConfirmModalType;

ConfirmModal.Mobile = ConfirmModalMobile;

export default ConfirmModal;
