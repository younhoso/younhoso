import axios from '@/axios';

export type CompleteOrderAPIRequestBody = {
  orderId: number;
};

export type CompleteOrderAPIResponseData = {
  orderId: number;
};

export const complete = async ({
  orderId,
}: CompleteOrderAPIRequestBody): Promise<CompleteOrderAPIResponseData> => {
  const { data } = await axios.get(`/api/delivery/order/complete?orderId=${orderId}`);

  return data;
};
