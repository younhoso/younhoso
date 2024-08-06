import axios from '@/axios';
import { QuickOrder } from '@/types';

export type GetQuickOrderAPIRequestBody = {
  id: number;
};

export type GetQuickOrderAPIResponseData = QuickOrder;

export const get = async (
  body: GetQuickOrderAPIRequestBody,
): Promise<GetQuickOrderAPIResponseData> => {
  const { data } = await axios.post(`/api/delivery/order/quick-order/list/${body.id}`);

  return data;
};
