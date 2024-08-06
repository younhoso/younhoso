import SpinnerMobile from './mobile/SpinnerMobile';
import _Spinner from './pc/Spinner';

type SpinnerP = typeof _Spinner;

interface SpinnerType extends SpinnerP {
  Mobile: typeof SpinnerMobile;
}

const Spinner = _Spinner as SpinnerType;

Spinner.Mobile = SpinnerMobile;

export default Spinner;
