import RateCheckMobile from './mobile/RateCheckMobile';
import _RateCheck from './pc/RateCheck';

type RateCheckP = typeof _RateCheck;

interface RateCheckType extends RateCheckP {
  Mobile: typeof RateCheckMobile;
}

const RateCheck = _RateCheck as RateCheckType;

RateCheck.Mobile = RateCheckMobile;

export default RateCheck;
