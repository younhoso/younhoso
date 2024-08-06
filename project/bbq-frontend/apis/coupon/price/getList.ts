import axios from '@/axios';
import { PriceCoupon } from '@/types';

export const getList = async (): Promise<PriceCoupon[]> => {
  const { data } = await axios.get(`/api/delivery/coupon/price-coupon`);

  return data;
};
