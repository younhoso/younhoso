import axios from '@/axios';
import { CalculateOrderAPIParams, CalculateOrderAPIResponse } from '@/types';

export const calculate = async (
  body: CalculateOrderAPIParams,
): Promise<CalculateOrderAPIResponse> => {
  const { data } = await axios.post(`/api/delivery/order/calc`, {
    ...body,
  });

  return data;
};
