// 자동으로 생성된 파일입니다. 수정하지 마세요.
import OrderContentItem from './OrderContentItem';
import _OrderContentTemplate from './main';

type OrderContentTemplateP = typeof _OrderContentTemplate;

interface OrderContentTemplateType extends OrderContentTemplateP {
  OrderContentItem: typeof OrderContentItem;
}

const OrderContentTemplate = _OrderContentTemplate as OrderContentTemplateType;

OrderContentTemplate.OrderContentItem = OrderContentItem;

export default OrderContentTemplate;
