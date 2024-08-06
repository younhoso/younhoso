import { Dispatch, SetStateAction } from 'react';

import { Selected } from '@/types/productOption';

export function orderCount(setSelected: Dispatch<SetStateAction<Selected[]>>) {
  const changeOrderCount = (itemIndex: number, newValue: number) => {
    setSelected(prevSelected =>
      prevSelected.map((item, index) => {
        if (index === itemIndex) {
          if (newValue > item.orderCnt) {
            return { ...item, orderCnt: newValue };
          } else if (newValue < item.orderCnt) {
            return { ...item, orderCnt: Math.max(1, newValue) };
          }
        }
        return item;
      }),
    );
  };

  return { changeOrderCount };
}
