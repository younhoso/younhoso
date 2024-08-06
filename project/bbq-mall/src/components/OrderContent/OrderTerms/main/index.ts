import OrderTermsMobile from './mobile/OrderTermsMobile';
import _OrderTerms from './pc/OrderTerms';

type OrderTermsP = typeof _OrderTerms;

interface OrderTermsType extends OrderTermsP {
  Mobile: typeof OrderTermsMobile;
}

const OrderTerms = _OrderTerms as OrderTermsType;

OrderTerms.Mobile = OrderTermsMobile;

export default OrderTerms;
