import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface Content {
  id: number;
  thumbnailImageUrl: string;
  bodyHtml: string;
  appBodyHtml: string;
  startsAt: string;
  endsAt: string;
  startDate: string;
  endDate: string;
  title: string;
  isActive: boolean;
  createdAdminName: string;
  isParticipated: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface DataListResponse {
  content: Content[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
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
      const result = await axios.get<DataListResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/content/event`,
        {
          params: {
            page: req.query.page,
            size: req.query.size,
            startsAt: req.query.startsAt,
            endsAt: req.query.endsAt,
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
        return res.status(error.response.status).send(error.response.data);
      } else {
        return res.status(500).send(error);
      }
    }
  }
}
