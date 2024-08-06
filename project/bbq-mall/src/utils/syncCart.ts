import { pick } from 'lodash';

import { CartProductData } from '@/components/CartProduct/main/pc/CartProduct';
import { CartLocastorage } from '@/components/ProductOptionPayInfo/main/mobile/ProductOptionPayInfoMobile';

export const syncCart = (body: CartProductData[]): CartLocastorage[] =>
  body.map(v => pick(v, ['cartNo', 'productNo', 'orderCnt', 'optionInputs', 'optionNo']));
