import axios from '@/axios';

export type CancelOrderAPIRequestBody = {
  id: number;
};

export type CancelOrderAPIResponseData = {
  orderId: string;
};

export const cancel = async ({
  id,
}: CancelOrderAPIRequestBody): Promise<CancelOrderAPIResponseData> => {
  const { data } = await axios.delete(`/api/delivery/order/process/${id}`);

  return data;
};
