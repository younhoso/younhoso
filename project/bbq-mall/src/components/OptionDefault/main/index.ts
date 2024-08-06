import OptionDefaultMobile from './mobile/OptionDefaultMobile';
import _OptionDefault from './pc/OptionDefault';

type OptionDefaultP = typeof _OptionDefault;

interface OptionDefaultType extends OptionDefaultP {
  Mobile: typeof OptionDefaultMobile;
}

const OptionDefault = _OptionDefault as OptionDefaultType;

OptionDefault.Mobile = OptionDefaultMobile;

export default OptionDefault;
