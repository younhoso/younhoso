import axios from '@/axios';

type Params = {
  couponNo: string;
};

type Response = {
  couponNo: string;
  issuanceType: string;
  couponName: string;
  description: string;
  benefitType: string;
  discountAmount: number;
  discountRate?: number;
  maxDiscountAmount?: number;
  minAmount: number;
  useStartsAt: string;
  useEndsAt: string;
  issuerType: string;
  isUsable: boolean;
  unUsableReason: string;
  calculatedDiscountPrice: number;
};

export const add = async (params: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/delivery/coupon/membership`, {
    ...params,
  });

  return data;
};
