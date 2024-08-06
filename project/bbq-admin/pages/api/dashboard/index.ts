import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface MainDashboardResponse {
  orderAndPayInfo: OrderAndPayInfo;
  totalCountInfo: TotalCountInfo;
  familyTypeInfos?: FamilyTypeInfosEntity[] | null;
  couponUsedInfo: CouponUsedInfo;
  totalPointSaveInfo: TotalPointSaveInfo;
}
export interface OrderAndPayInfo {
  totalOrderCount: number;
  yesterdayTotalOrderCount: number;
  totalOrderCancelCount: number;
  yesterdayTotalOrderCancelCount: number;
  orderTakeoutCount: number;
  orderTakeoutCancelCount: number;
  orderDeliveryCount: number;
  orderDeliveryCancelCount: number;
  totalPayAmount: number;
  yesterdayTotalPayAmount: number;
  orderTakeoutPayAmount: number;
  orderDeliveryPayAmount: number;
}
export interface TotalCountInfo {
  totalFamilyCount: number;
  totalCouponCount: number;
  menuTotalCount: number;
  yesterdayTotalCouponCount: number;
}
export interface FamilyTypeInfosEntity {
  familyType: string;
  familyTypeCount: number;
}
export interface CouponUsedInfo {
  usedCouponCount: number;
  notUsedCouponCount: number;
}
export interface TotalPointUsageInfo {
  todayPointUsageCount: number;
  todayPointUsage: number;
  yesterdayPoitnUsageCount: number;
  yesterdayPointusage: number;
}
export interface TotalPointSaveInfo {
  todayPointSaveCount: number;
  todayPointSave: number;
  yesterdayPoitnSaveCount: number;
  yesterdayPointSave: number;
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
      const result = await axios.get<MainDashboardResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/main/dashboard`,
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
