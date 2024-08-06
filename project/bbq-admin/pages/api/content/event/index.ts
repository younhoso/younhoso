import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

import { ContentEventListCondition } from '@/app/content/event/page';

export interface ContentEventListResponse {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  number: number;
  sort: any[];
  size: number;
  numberOfElements: number;
  empty: boolean;
}

export interface Content {
  id: number;
  thumbnailImageUrl: string;
  bodyHtml: string;
  appBodyHtml: string;
  startDate: string;
  endDate: string;
  title: string;
  isActive: boolean;
  createdAdminName: string;
  isParticipated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pageable {
  sort: any[];
  offset: number;
  pageNumber: number;
  pageSize: number;
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
      const result = await axios.get<ContentEventListResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/content/event`,
        {
          params: req.query as unknown as ContentEventListCondition,
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
  } else if (req.method === 'DELETE') {
    try {
      const result = await axios.delete(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/content/event/${req.query.id}`,
        {
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
      if (isAxiosError(error) && error.response) {
        return res.status(error.response.status).send(error.response.data);
      } else {
        return res.status(500).send(error);
      }
    }
  }
}
