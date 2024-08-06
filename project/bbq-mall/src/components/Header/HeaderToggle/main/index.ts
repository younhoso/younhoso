import HeaderToggleMobile from './mobile/HeaderToggleMobile';
import _HeaderToggle from './pc/HeaderToggle';

type HeaderToggleP = typeof _HeaderToggle;

interface HeaderToggleType extends HeaderToggleP {
  Mobile: typeof HeaderToggleMobile;
}

const HeaderToggle = _HeaderToggle as HeaderToggleType;

HeaderToggle.Mobile = HeaderToggleMobile;

export default HeaderToggle;
