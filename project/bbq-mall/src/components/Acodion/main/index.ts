import AcodionMobile from './mobile/AcodionMobile';
import _Acodion from './pc/Acodion';

type AcodionP = typeof _Acodion;

interface AcodionType extends AcodionP {
  Mobile: typeof AcodionMobile;
}

const Acodion = _Acodion as AcodionType;

Acodion.Mobile = AcodionMobile;

export default Acodion;
