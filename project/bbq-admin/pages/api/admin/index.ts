import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

import { Authority } from './[...id]';

export interface AdminListResponse {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  number: number;
  sort: any[];
  first: boolean;
  size: number;
  numberOfElements: number;
  empty: boolean;
}

export interface Content {
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

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: any[];
  offset: number;
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
      const result = await axios.get<AdminListResponse>(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/user`,
        {
          params: {
            page: req.query.page,
            size: req.query.size,
            searchName: req.query.searchName,
            isUsed: req.query.isUsed,
            isDeleted: req.query.isDeleted,
            allowIps: req.query.allowIps,
            authorities:
              req.query.authorities && req.query.authorities[0] == 'all'
                ? ['SYSTEM', 'CONTENT', 'ORDER', 'FAMILY', 'MENU', 'COUPON', 'CUSTOMER']
                : req.query.authorities,
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
        return res.status(500).send(error.response.data);
      } else {
        return res.status(500).send(error);
      }
    }
  } else if (req.method === 'POST') {
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/user`,
        req.body,
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
