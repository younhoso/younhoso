import { GetCartAPIResponse } from '@/types';

const serializeCartForMap = (cart: GetCartAPIResponse) => {
  return cart.responseList
    .map(item => {
      return `${item.mainMenuId}-${item.quantity}-${item.subOptionHeadList
        .map(option => option.subOptionId)
        .join('_')}`;
    })
    .join('--');
};

export { serializeCartForMap };
