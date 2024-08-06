// 자동으로 생성된 파일입니다. 수정하지 마세요.
import HeaderToggle from './HeaderToggle';
import _Header from './main';

type HeaderP = typeof _Header;

interface HeaderType extends HeaderP {
  HeaderToggle: typeof HeaderToggle;
}

const Header = _Header as HeaderType;

Header.HeaderToggle = HeaderToggle;

export default Header;
