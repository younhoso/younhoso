import HeaderMobile from './mobile/HeaderMobile';
import _Header from './pc/Header';

type HeaderP = typeof _Header;

interface HeaderType extends HeaderP {
  Mobile: typeof HeaderMobile;
}

const Header = _Header as HeaderType;

Header.Mobile = HeaderMobile;

export default Header;
