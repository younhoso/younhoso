import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface OrderDashboardResponse {
  orderDashboardDetailInfo: OrderDashboardDetailInfo;
  orderDashboardWeeklyInfo: OrderDashboardWeeklyInfo;
  orderDashboardDailyInfos: OrderDashboardDailyInfosEntity[];
  orderMaxMinDailyInfo: orderMaxMinDailyInfo;
}
export interface OrderDashboardDetailInfo {
  totalOrderCount: number;
  yesterdayTotalOrderCount: number;
  appOrderCount: number;
  webOrderCount: number;
  avgOrderAmount: number;
  yesterdayAvgOrderAmount: number;
  appAvgOrderAmount: number;
  webAvgOrderAmount: number;
  cancelCount: number;
  totalTodayPayAmount: number;
  yesterdayTotalTodayPayAmount: number;
  appTodayPayAmount: number;
  yesterdayAppTodayPayAmount: number;
  webTodayPayAmount: number;
  yesterdayWebTodayPayAmount: number;
}
export interface OrderDashboardWeeklyInfo {
  totalWeekPayAmount: number;
  avgWeekPayAmount: number;
  maxWeekPayAmount: number;
  minWeekPayAmount: number;
}
export interface OrderDashboardDailyInfosEntity {
  dailyPayAmount: number;
  dailyDate: string;
}

export interface orderMaxMinDailyInfo {
  maxDate: string;
  maxWeekPayAmount: number;
  minDate: string;
  minWeekPayAmount: number;
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
      let queryDay;
      const { periodType, startDate, endDate } = req.query;
      if (typeof startDate === 'string' && startDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
        queryDay = `custom?startDate=${startDate}&endDate=${endDate}`;
      } else {
        queryDay = `${periodType}`;
      }

      const result = await axios.get<OrderDashboardResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/order/dashboard/${queryDay}`,
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
