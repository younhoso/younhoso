import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface CustomerChickenListResponse {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  sort: any[];
  number: number;
  size: number;
  numberOfElements: number;
  empty: boolean;
}

export interface Content {
  id: number;
  memberId: string;
  memberType: string;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  title: string;
  content: string;
  contentFileUrl1: string;
  contentFileUrl2: string;
  contentFileUrl3: string;
  createdAt: string;
  isHasAttachment: boolean;
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
      const result = await axios.get<Content>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/user/relay/${req.query.id}`,
        {
          params: {
            id: req.query.id,
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
      console.error(error);
      if (isAxiosError(error) && error.response) {
        return error.response.data.message;
      } else {
        return error;
      }
    }
  } else if (req.method === 'DELETE') {
    try {
      const result = await axios.delete(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/user/relay/${req.query.id}`,
        {
          params: {
            id: req.query.id,
          },
          headers: {
            Authorization: `Bearer ${token?.authenticationResponse?.accessToken}`,
          },
        },
      );
      if (result.status == 204) {
        return res.status(200).send(result.data);
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      if (isAxiosError(error) && error.response) {
        return error.response.data.message;
      } else {
        return error;
      }
    }
  }
}
