import axios from '@/axios';

export type AddQuickOrderAPIRequestBody = {
  orderHistoryId: number;
  quickOrderTitle: string;
};

export type AddQuickOrderAPIResponseData = {
  id: number;
  mealType: string;
  quickOrderTitle: string;
  quickOrderDetailList: {
    id: number;
    menuId: number;
    menuName: string;
    quantity: number;
    quickOrderSubOptionItemDetailList: {
      menuId: number;
      subOptionId: number;
      subOptionName: string;
      subOptionItemName: string;
    }[];
  }[];
};

export const add = async (
  body: AddQuickOrderAPIRequestBody,
): Promise<AddQuickOrderAPIResponseData> => {
  const { data } = await axios.post(`/api/delivery/order/quick-order`, {
    ...body,
  });

  return data;
};
