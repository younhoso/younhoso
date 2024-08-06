import NavMobile from './mobile/NavMobile';
import _Nav from './pc/Nav';

type NavP = typeof _Nav;

interface NavType extends NavP {
  Mobile: typeof NavMobile;
}

const Nav = _Nav as NavType;

Nav.Mobile = NavMobile;

export default Nav;
