import axios from '@/axios';

export type DeleteQuickOrderAPIRequestBody = {
  id: number;
};

export const delete_ = async ({ id }: DeleteQuickOrderAPIRequestBody): Promise<true> => {
  await axios.delete(`/api/delivery/order/quick-order/${id}`);

  return true;
};
