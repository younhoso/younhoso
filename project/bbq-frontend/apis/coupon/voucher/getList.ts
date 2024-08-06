import axios from '@/axios';
import { VoucherCoupon } from '@/types';

export const getList = async (): Promise<VoucherCoupon[]> => {
  const { data } = await axios.get(`/api/delivery/coupon/voucher`);

  return data;
};
