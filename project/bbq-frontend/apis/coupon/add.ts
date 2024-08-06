import axios from '@/axios';

type Params = {
  couponNo: string;
};

type Response = {
  couponNo: string;
  type: string;
};

export const add = async (params: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/delivery/coupon/issue`, {
    ...params,
  });

  return data;
};
