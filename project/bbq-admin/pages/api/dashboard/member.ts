import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface MainDashboardMemberResponse {
  memberCountInfo: MemberCountInfo;
  dailyMemberCountInfos?: DailyMemberCountInfosEntity[] | null;
  memberPoint: MemberPoint;
}
export interface MemberCountInfo {
  totalMemberCount: number;
  yesterdayTotalMemberCount: number;
}
export interface DailyMemberCountInfosEntity {
  daily: string;
  memberCount: number;
}
export interface MemberPoint {
  totalPoint: number;
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
      const result = await axios.get<MainDashboardMemberResponse>(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/main/dashboard/member/${queryDay}`,
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
