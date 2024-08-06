import CartProductMobile from './mobile/CartProductMobile';
import _CartProduct from './pc/CartProduct';

type CartProductP = typeof _CartProduct;

interface CartProductType extends CartProductP {
  Mobile: typeof CartProductMobile;
}

const CartProduct = _CartProduct as CartProductType;

CartProduct.Mobile = CartProductMobile;

export default CartProduct;
