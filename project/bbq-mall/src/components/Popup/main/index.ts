import PopupMobile from './mobile/PopupMobile';
import _Popup from './pc/Popup';

type PopupP = typeof _Popup;

interface PopupType extends PopupP {
  Mobile: typeof PopupMobile;
}

const Popup = _Popup as PopupType;

Popup.Mobile = PopupMobile;

export default Popup;
