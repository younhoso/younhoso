import CartIconMobile from './mobile/CartIconMobile';
import _CartIcon from './pc/CartIcon';

type CartIconP = typeof _CartIcon;

interface CartIconType extends CartIconP {
  Mobile: typeof CartIconMobile;
}

const CartIcon = _CartIcon as CartIconType;

CartIcon.Mobile = CartIconMobile;

export default CartIcon;
