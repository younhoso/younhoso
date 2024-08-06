import OptionChangeBoxMobile from './mobile/OptionChangeBoxMobile';
import _OptionChangeBox from './pc/OptionChangeBox';

type OptionChangeBoxP = typeof _OptionChangeBox;

interface OptionChangeBoxType extends OptionChangeBoxP {
  Mobile: typeof OptionChangeBoxMobile;
}

const OptionChangeBox = _OptionChangeBox as OptionChangeBoxType;

OptionChangeBox.Mobile = OptionChangeBoxMobile;

export default OptionChangeBox;
