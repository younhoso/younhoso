import ProductCardMobile from './mobile/ProductCardMobile';
import _ProductCard from './pc/ProductCard';

type ProductCardP = typeof _ProductCard;

interface ProductCardType extends ProductCardP {
  Mobile: typeof ProductCardMobile;
}

const ProductCard = _ProductCard as ProductCardType;

ProductCard.Mobile = ProductCardMobile;

export default ProductCard;
