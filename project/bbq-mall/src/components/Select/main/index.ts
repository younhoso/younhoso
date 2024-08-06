import SelectMobile from './mobile/SelectMobile';
import _Select from './pc/Select';

type SelectP = typeof _Select;

interface SelectType extends SelectP {
  Mobile: typeof SelectMobile;
}

const Select = _Select as SelectType;

Select.Mobile = SelectMobile;

export default Select;
