import axios from '@/axios';

type Params = {
  couponNo: string;
};

type Response = {
  couponNo: string;
  couponName: string;
  couponType: string;
  menuId: number;
  menuName: string;
  couponPrice: number;
  startDate: string;
  endDate: string;
  isUsed: boolean;
  isHidden: boolean;
};

export const add = async (params: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/delivery/coupon/ecoupon`, {
    ...params,
  });

  return data;
};
