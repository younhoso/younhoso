import axios from '@/axios';
import { MembershipCoupon } from '@/types';

type Response = MembershipCoupon[];

export const getList = async (): Promise<Response> => {
  const { data } = await axios.get(`/api/delivery/coupon/membership`);

  return data;
};
