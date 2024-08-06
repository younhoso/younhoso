import { AxiosResponse } from 'axios';

import { CartProductData } from '@/components/CartProduct/main/pc/CartProduct';
import { Cart } from '@/types';

export const setCartListAction = (cart: AxiosResponse<Cart, any>) => {
  return (
    cart?.data.deliveryGroups.reduce((acc: CartProductData[], cur) => {
      cur.orderProducts.forEach(k => {
        k.orderProductOptions.forEach(j => {
          acc.push({
            ...j,
            value: j.cartNo,
            productName: k.productName,
          });
        });
      });

      return acc;
    }, []) || []
  );
};
