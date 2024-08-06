import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface CouponMembershipResponse {
  content: ContentEntity[];
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
  couponCategory: string;
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
  usedCount: number;
  notUsedCount: number;
  createdBy: string;
  status: string;
}
export interface Pageable {
  sort?: string[] | null;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface CouponMembershipRequest {
  id?: number | null;
  couponName: string;
  description: string;
  isActive: boolean;
  issuanceType: string;
  couponCategory: string;
  benefitType: string;
  discountAmount: number;
  discountRate: number;
  maxDiscountAmount: number;
  benefitProductList?: number[] | null;
  minAmount: number;
  mealTypes?: string[] | null;
  membershipGrades?: number[] | null;
  offerCount: number;
  offerStartsAt: string;
  offerEndsAt: string;
  maxIssuePerMember: number;
  maxIssuePerMemberDay: number;
  usableDayOfWeeks?: string[] | null;
  usableStartsTime?: number[] | null;
  usableEndsTime?: number[] | null;
  requiredProductList?: number[] | null;
  issuerType: string;
  issuerName: string;
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
      const result = await axios.get<CouponMembershipResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/coupon/membership`,
        {
          params: {
            page: req.query.page,
            size: req.query.size,
            searchName: req.query.searchName,
            isActive: req.query.isActive,
            status: req.query.status,
            couponCategory: req.query.couponCategory,
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
  } else if (req.method === 'POST') {
    try {
      const result = await axios.post<CouponMembershipRequest>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/coupon/membership`,
        req.body as CouponMembershipRequest,
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
