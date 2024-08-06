import ProductInquiryItemMobile from './mobile/ProductInquiryItemMobile';
import _ProductInquiryItem from './pc/ProductInquiryItem';

type ProductInquiryItemP = typeof _ProductInquiryItem;

interface ProductInquiryItemType extends ProductInquiryItemP {
  Mobile: typeof ProductInquiryItemMobile;
}

const ProductInquiryItem = _ProductInquiryItem as ProductInquiryItemType;

ProductInquiryItem.Mobile = ProductInquiryItemMobile;

export default ProductInquiryItem;
