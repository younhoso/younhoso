import ReturnMobile from './mobile/ReturnMobile';
import _Return from './pc/Return';

type ReturnP = typeof _Return;

interface ReturnType extends ReturnP {
  Mobile: typeof ReturnMobile;
}

const Return = _Return as ReturnType;

Return.Mobile = ReturnMobile;

export default Return;
