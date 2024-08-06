import axios from '@/axios';

export type DeleteQuickOrderDetailAPIRequestBody = {
  id: number;
};

export const deleteDetail = async ({ id }: DeleteQuickOrderDetailAPIRequestBody): Promise<true> => {
  await axios.delete(`/api/delivery/order/quick-order/detail/${id}`);

  return true;
};
