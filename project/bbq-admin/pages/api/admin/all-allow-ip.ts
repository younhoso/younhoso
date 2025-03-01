import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface AllAllowIpResponse {
  id: number;
  isAllowAll: boolean;
  adminUserId: string;
  adminUserName: string;
  allowIp: string;
  allowIpDesc: string;
  startDate: string;
  endDate: string;
  isUsed: boolean;
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
      const result = await axios.get<AllAllowIpResponse[]>(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/user/all-allow-ip`,
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
        return error.response.data.message;
      } else {
        return error;
      }
    }
  }
}
