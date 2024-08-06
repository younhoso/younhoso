import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface ContentNoticeListResponse {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  sort: any[];
  number: number;
  size: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Content {
  id: number;
  title: string;
  bodyHtml: string;
  isActive: boolean;
  createdAdminName: string;
  createdAt: string;
  updatedAt: string;
  isTopFixed: boolean;
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
      const result = await axios.get<ContentNoticeListResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/content/notice-user`,
        {
          params: {
            page: req.query.page,
            size: req.query.size,
            searchName: req.query.searchName,
            isActive: req.query.isActive,
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
        return error.response.data.message;
      } else {
        return error;
      }
    }
  } else if (req.method === 'POST') {
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/content/notice-user`,
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
  } else if (req.method === 'PATCH') {
    try {
      const result = await axios.patch(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/content/notice-user/${req.query.id}`,
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
  } else if (req.method === 'DELETE') {
    try {
      const result = await axios.delete(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/content/notice-user/${req.query.id}`,
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
