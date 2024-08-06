import ModalQnaFormMobile from './mobile/ModalQnaFormMobile';
import _ModalQnaForm from './pc/ModalQnaForm';

type ModalQnaFormP = typeof _ModalQnaForm;

interface ModalQnaFormType extends ModalQnaFormP {
  Mobile: typeof ModalQnaFormMobile;
}

const ModalQnaForm = _ModalQnaForm as ModalQnaFormType;

ModalQnaForm.Mobile = ModalQnaFormMobile;

export default ModalQnaForm;
