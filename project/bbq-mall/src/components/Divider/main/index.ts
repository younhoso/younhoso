import DividerMobile from './mobile/DividerMobile';
import _Divider from './pc/Divider';

type DividerP = typeof _Divider;

interface DividerType extends DividerP {
  Mobile: typeof DividerMobile;
}

const Divider = _Divider as DividerType;

Divider.Mobile = DividerMobile;

export default Divider;
