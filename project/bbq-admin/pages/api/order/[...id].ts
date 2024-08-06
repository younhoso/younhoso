import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

import { MealType, MemberType, OrderChannel, OrderFlow, PaymentMethod, PaymentType } from './list';

export interface OrderDetailResponse {
  id: number;
  memberId: string;
  memberName: string;
  memberType: string;
  familyName: string;
  familyTel: string;
  familyMobile: string;
  familyAddress: string;
  orderMenuTitle: string;
  orderStatus: string;
  orderFlow: string;
  mealType: string;
  orderChannel: string;
  paymentMethod: string;
  orderAmount: number;
  deliveryFee: number;
  discountAmount: number;
  payAmount: number;
  payedAt: string;
  deliveryAddress: string;
  deliveryAddressDetail: string;
  mobile: string;
  orderMessage: string;
  deliveryMessage: string;
  cancelledAt: string;
  cancelReason: string;
  cancelType: string;
  estimateMin: number;
  deliverStartAt: string;
  takeoutVisitMin: number;
  earnPoint: number;
  earnPointType: string;
  createdAt: string;
  orderDetails: OrderDetail[];
  orderPaymentInfos: OrderPaymentInfo[];
}

export interface OrderDetail {
  id: number;
  memberId: string;
  memberName: string;
  memberType: string;
  menuId: number;
  menuImageUrl: string;
  menuName: null;
  menuPrice: null;
  quantity: number;
  menuAndSubOptionPrice: number;
  menuAndSubOptionAndQuantityPrice: number;
  ecouponNoList: null;
  subOptionItems: SubOptionItem[];
}

export interface SubOptionItem {
  id: number;
  memberId: string;
  memberName: string;
  memberType: string;
  menuId: number;
  subOptionId: number;
  subOptionItemId: number;
  subOptionName: string;
  subOptionItemName: string;
  subOptionItemPrice: number;
}

export interface OrderPaymentInfo {
  id: number;
  memberId: string;
  memberName: string;
  memberType: string;
  paymentType: string;
  paymentMethod: null | string;
  payAmount: number;
  couponNo: string;
  cancelKey: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    // secureCookie: process.env.NODE_ENV == 'production' ? true : false
  });

  if (token?.authenticationResponse?.accessToken == undefined)
    return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    const result = await axios.get<OrderDetailResponse>(
      `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/order/${req.query.id}`,
      {
        headers: {
          Authorization: `Bearer ${token?.authenticationResponse?.accessToken}`,
        },
      },
    );
    if (result.status === 200) {
      return res.status(200).send(result.data);
    } else {
      return null;
    }
  } else if (req.method === 'DELETE') {
    const { id, cancelReason } = req.query;

    try {
      const result = await axios.delete(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/order/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token?.authenticationResponse?.accessToken}`,
          },
          data: {
            cancelReason,
          },
        },
      );

      // 응답 처리
      if (result.status === 200) {
        return res.status(200).send(result.data);
      } else {
        return null;
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return res.status(error.response.status).send(error.response.data);
      } else {
        return res.status(500).send(error);
      }
    }
  }
}
