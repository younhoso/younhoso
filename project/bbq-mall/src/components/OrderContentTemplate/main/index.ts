import OrderContentTemplateMobile from './mobile/OrderContentTemplateMobile';
import _OrderContentTemplate from './pc/OrderContentTemplate';

type OrderContentTemplateP = typeof _OrderContentTemplate;

interface OrderContentTemplateType extends OrderContentTemplateP {
  Mobile: typeof OrderContentTemplateMobile;
}

const OrderContentTemplate = _OrderContentTemplate as OrderContentTemplateType;

OrderContentTemplate.Mobile = OrderContentTemplateMobile;

export default OrderContentTemplate;
