import axios from '@/axios';
import { Order } from '@/types';

export type GetOrderDetailAPIRequestBody = {
  id: number;
};

export type GetOrderDetailAPIResponseData = Order;

export const get = async ({
  id,
}: GetOrderDetailAPIRequestBody): Promise<GetOrderDetailAPIResponseData> => {
  const { data } = await axios.get(`/api/delivery/order/history/${id}`);

  return data;
};
