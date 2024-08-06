import axios from '@/axios';

import { OrderAgent } from './init';

export type ProcessOrderAPIRequestBody = {
  mealType: string;
  branchId: string;
  cartList: {
    mainMenuId: number;
    quantity: number;
    subOptionItemIdSet: number[];
  }[];
  orderFlow: string;
  orderRequestMessage: string;
  deliveryRequestMessage: string;
  deliveryAddress: string;
  deliveryAddressDetail: string;
  takeoutVisitMin: number;
  usePoint: number;
  useHpcPoint: number;
  earnPointType: 'BBQ' | 'HPC';
  ecouponList: string[];
  voucherList: string[];
  priceCouponList: string[];
  membershipCouponUsageList: {
    couponNo: string;
    issuanceType: string;
  }[];
  paymentMethod: string;
};

export type ProcessOrderAPIResponseData = {
  orderId: number;
  paymentAmount: number;
  paymentRequired: boolean;
  paymentUrl: string;
  completeUrl: string;
};

export const process = async (
  body: ProcessOrderAPIRequestBody,
  orderAgent: OrderAgent,
): Promise<ProcessOrderAPIResponseData> => {
  const { data } = await axios.post(
    `/api/delivery/order/process`,
    {
      ...body,
    },
    {
      headers: {
        'x-agent': orderAgent,
      },
    },
  );

  return data;
};
