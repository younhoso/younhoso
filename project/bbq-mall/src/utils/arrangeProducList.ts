import { CartProductData } from '@/components/CartProduct/main/pc/CartProduct';
import { DeliveryGroup } from '@/types';

export const arrangeProductList = (deliveryGroups: DeliveryGroup[] | undefined) => {
  return (
    deliveryGroups?.reduce((acc: CartProductData[], cur) => {
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
