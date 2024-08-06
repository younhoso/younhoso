import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface FamilyLocationResponse {
  familyDashboardAreaInfo: FamilyDashboardAreaInfo;
  familyDashboardByTypeList: FamilyDashboardByTypeList[];
}

export interface FamilyDashboardAreaInfo {
  totalCount: number;
  openNowCount: number;
  notOpenNowCount: number;
}

export interface FamilyDashboardByTypeList {
  familyType: string;
  familyTypeCount: number;
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
      const result = await axios.get<FamilyLocationResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/family/dashboard/${req.query.location}`,
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
