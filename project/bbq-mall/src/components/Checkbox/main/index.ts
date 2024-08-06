import CheckboxMobile from './mobile/CheckboxMobile';
import _Checkbox from './pc/Checkbox';

type CheckboxP = typeof _Checkbox;

interface CheckboxType extends CheckboxP {
  Mobile: typeof CheckboxMobile;
}

const Checkbox = _Checkbox as CheckboxType;

Checkbox.Mobile = CheckboxMobile;

export default Checkbox;
