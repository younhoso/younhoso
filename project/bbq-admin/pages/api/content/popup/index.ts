import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface Popup {
  id: number;
  aosUrl: string;
  createdAt: string;
  endDate: string;
  imageUrl: string;
  iosUrl: string;
  isActive: boolean;
  startDate: string;
  webUrl: string;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: any[];
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ApiResponse {
  content: Popup[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: any[];
  first: boolean;
  empty: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });

  if (token?.authenticationResponse?.accessToken == undefined)
    return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    try {
      const result = await axios.get<ApiResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/content/popup`,
        {
          params: {
            page: req.query.page,
            size: req.query.size,
            isActive: req.query.isActive,
            startDate: req.query.startDate,
            endDate: req.query.endDate,
          },
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
        return error.response.data.message;
      } else {
        return error;
      }
    }
  } else if(req.method === 'DELETE') {
    try {
      const result = await axios.delete<ApiResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/content/popup/${req.query.id}`,
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
        return res.status(error?.response.status).send(error.response.data);
      } else {
        return error;
      }
    }
  }
}
