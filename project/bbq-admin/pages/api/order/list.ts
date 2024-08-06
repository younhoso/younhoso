import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export type MealType = 'TAKEOUT' | 'DELIVERY' | 'EAT_IN';

export type OrderChannel =
  | 'MOBILE_APP_ANDROID'
  | 'MOBILE_APP_IOS'
  | 'MOBILE_WEB'
  | 'DESKTOP_WEB'
  | 'OTHER';

export type OrderStatus =
  | 'ADMIN_CANCELLED'
  | 'PAY_WAITING'
  | 'PAY_FAILED'
  | 'PAY_COMPLETED'
  | 'NOTIFIED'
  | 'COOKING'
  | 'IN_DELIVERY'
  | 'COMPLETED'
  | 'CANCEL_REQUESTED'
  | 'CANCEL_CONFIRMED';
export type PaymentMethod =
  | 'SG_PAY'
  | 'UB_PAY'
  | 'KAKAO_PAY'
  | 'NAVER_PAY'
  | 'TOSS_PAY'
  | 'PAYCO_PAY'
  | 'DANAL_CARD'
  | 'DANAL_PHONE'
  | 'DANAL_PAYCOIN'
  | 'PAY_LATER_CARD'
  | 'PAY_LATER_CASH'
  | 'NONE';

export type MemberType = 'MEMBER' | 'GUEST' | 'NONE' | 'ROOT_ADMIN' | 'FAMILY_ADMIN';

export type PaymentType =
  | 'TAKEOUT'
  | 'ECOUPON'
  | 'POINT'
  | 'MEMBERSHIP_COUPON_PUBLIC'
  | 'MEMBERSHIP_COUPON_PRIVATE'
  | 'VOUCHER'
  | 'PRICE_COUPON'
  | 'REAL_PAYMENT';

export type OrderFlow = 'CART' | 'DIRECT' | 'QUICK_ORDER';

export interface OrderListResponse {
  content?: ContentEntity[] | null;
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  number: number;
  sort?: string[] | null;
  first: boolean;
  size: number;
  numberOfElements: number;
  empty: boolean;
}
export interface ContentEntity {
  id: number;
  memberId: string;
  memberName: string;
  memberType: string;
  familyName: string;
  orderMenuTitle: string;
  orderStatus: OrderStatus;
  orderFlow: OrderFlow;
  mealType: MealType;
  orderChannel: OrderChannel;
  paymentMethod: PaymentMethod;
  orderAmount: number;
  deliveryFee: number;
  discountAmount: number;
  payAmount: number;
  payedAt: string;
  deliveryAddress: string;
  deliveryAddressDetail: string;
  mobile: string;
  orderRegNoByFamily: number;
  orderMessage: string;
  deliveryMessage: string;
  cancelledAt?: string | null;
  createdAt: string;
}
export interface Pageable {
  sort?: string[] | null;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
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
    try {
      const result = await axios.get<OrderListResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/order`,
        {
          params: {
            page: req.query.page,
            size: req.query.size,
            searchName: req.query.searchName,
            mealType: req.query.mealType,
            status: req.query.status,
            orderChannel: req.query.orderChannel,
            orderStatus: req.query.orderStatus,
            paymentMethod: req.query.paymentMethod,
            startDate: req.query.startDate,
            endDate: req.query.endDate,
            orderAmountStart: req.query.orderAmountStart,
            orderAmountEnd: req.query.orderAmountEnd,
          },
          headers: {
            Authorization: `Bearer ${token?.authenticationResponse?.accessToken}`,
          },
        },
      );
      if (result.status == 200) {
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
