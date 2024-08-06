import axios from '@/axios';

type Response = {
  membershipCouponCount: number;
  ecouponCount: number;
};

export const getDeliveryInfo = async (): Promise<Response> => {
  const { data } = await axios.get(`/api/delivery/member/info`);

  return data;
};
