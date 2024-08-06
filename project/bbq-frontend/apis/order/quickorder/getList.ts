import axios from '@/axios';
import { QuickOrder } from '@/types';

export type GetQuickOrderListAPIResponse = QuickOrder[];

export const getList = async (): Promise<GetQuickOrderListAPIResponse> => {
  const { data } = await axios.get(`/api/delivery/order/quick-order`);

  return data;
};
