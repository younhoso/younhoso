import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface AdminResponse {
  id: number;
  userId: string;
  name: string;
  empId: null;
  isUsed: boolean;
  isDeleted: boolean;
  authorities: Authority[];
  allowIps: AllowIP[];
}

export interface AllowIP {
  id: number;
  isAllowAll: boolean;
  allowIp: string;
  allowIpDesc: string;
  startDate: string;
  endDate: string;
  isUsed: boolean;
}

export interface Authority {
  authority: string;
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
      const result = await axios.get<AdminResponse>(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/user/all-allow-ip/${req.query.editId}`,
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
  } else if (req.method === 'PATCH') {
    try {
      const result = await axios.patch(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/user/all-allow-ip/${req.query.editId}`,
        req.body,
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
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return res.status(error.response.status).send(error.response.data);
      } else {
        return res.status(500).send(error);
      }
    }
  } else if (req.method === 'DELETE') {
    try {
      const result = await axios.delete(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/user/all-allow-ip/${req.query.editId}`,
        {
          headers: {
            Authorization: `Bearer ${token?.authenticationResponse?.accessToken}`,
          },
        },
      );
      if (result.status === 204) {
        return res.status(204).send(result.data);
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
