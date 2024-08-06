import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface CouponDetailResponse {
  id: number;
  paycoCouponId: string;
  publicCouponNo: string;
  couponName: string;
  description: string;
  isActive: boolean;
  issuanceType: string;
  category: string;
  benefitType: string;
  discountAmount: number;
  discountRate: number;
  maxDiscountAmount: number;
  benefitProductList?: number[] | null;
  minAmount: number;
  isGiftSendAvailable: boolean;
  usableChannels?: string[] | null;
  mealTypes?: string[] | null;
  membershipGrades?: number[] | null;
  offerCount: number;
  offerStartsAt: string;
  offerEndsAt: string;
  useStartsAt: string;
  useEndsAt: string;
  usableDaysAfter: number;
  maxIssuePerMember: number;
  maxIssuePerMemberDay: number;
  usableDayOfWeeks?: string[] | null;
  usableStartsTime: string;
  usableEndsTime: string;
  expireInDays: number;
  requiredProductList?: number[] | null;
  issuerType: string;
  issuerName: string;
  usedCount?: number | null;
  notUsedCount?: number | null;
  createdBy: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    // secureCookie: process.env.NODE_ENV == 'production' ? true : false
  });

  let id = req.query.id;
  if (req.query.id && req.query.id.length > 1) {
    id = req.query.id[1];
  }

  if (token?.authenticationResponse?.accessToken == undefined)
    return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    try {
      const result = await axios.get<CouponDetailResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/coupon/membership/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token?.authenticationResponse?.accessToken}`,
          },
        },
      );
      if (result.status == 200) {
        return res.status(200).send(result.data);
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return res.status(error.response.status).send(error.response.data);
      } else {
        return res.status(500).send(error);
      }
    }
  } else if (req.method === 'PATCH') {
    try {
      const result = await axios.patch<CouponDetailResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/coupon/membership/${id}`,
        req.body as CouponDetailResponse,
        {
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
