import CartPageDivideMobile from './mobile/CartPageDivideMobile';
import _CartPageDivide from './pc/CartPageDivide';

type CartPageDivideP = typeof _CartPageDivide;

interface CartPageDivideType extends CartPageDivideP {
  Mobile: typeof CartPageDivideMobile;
}

const CartPageDivide = _CartPageDivide as CartPageDivideType;

CartPageDivide.Mobile = CartPageDivideMobile;

export default CartPageDivide;
