import axios from '@/axios';

type Params = {
  couponNo: string;
};

type Response = {
  couponNo: string;
  balance: number;
  endDate: string;
}[];

export const add = async (params: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/delivery/coupon/price-coupon`, {
    ...params,
  });

  return data;
};
