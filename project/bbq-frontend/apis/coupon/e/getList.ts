import axios from '@/axios';
import { ECoupon } from '@/types';

type Response = ECoupon[];

export const getList = async (): Promise<Response> => {
  const { data } = await axios.get(`/api/delivery/coupon/ecoupon`);

  return data;
};
