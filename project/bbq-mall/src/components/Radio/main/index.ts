import RadioMobile from './mobile/RadioMobile';
import _Radio from './pc/Radio';

type RadioP = typeof _Radio;

interface RadioType extends RadioP {
  Mobile: typeof RadioMobile;
}

const Radio = _Radio as RadioType;

Radio.Mobile = RadioMobile;

export default Radio;
