import axios from '@/axios';

type Params = {
  voucherSn: string;
};

type Response = {
  id: number;
  voucherSn: string;
  price: number;
  endDate: string;
};

export const add = async (params: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/delivery/coupon/voucher`, {
    ...params,
  });

  return data;
};
