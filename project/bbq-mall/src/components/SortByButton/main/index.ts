import SortByButtonMobile from './mobile/SortByButtonMobile';
import _SortByButton from './pc/SortByButton';

type SortByButtonP = typeof _SortByButton;

interface SortByButtonType extends SortByButtonP {
  Mobile: typeof SortByButtonMobile;
}

const SortByButton = _SortByButton as SortByButtonType;

SortByButton.Mobile = SortByButtonMobile;

export default SortByButton;
