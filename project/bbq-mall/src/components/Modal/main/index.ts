import ModalMobile from './mobile/ModalMobile';
import _Modal from './pc/Modal';

type ModalP = typeof _Modal;

interface ModalType extends ModalP {
  Mobile: typeof ModalMobile;
}

const Modal = _Modal as ModalType;

Modal.Mobile = ModalMobile;

export default Modal;
