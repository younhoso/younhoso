import LabelMobile from './mobile/LabelMobile';
import _Label from './pc/Label';

type LabelP = typeof _Label;

interface LabelType extends LabelP {
  Mobile: typeof LabelMobile;
}

const Label = _Label as LabelType;

Label.Mobile = LabelMobile;

export default Label;
