import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface CustomerOrderListResponse {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  sort: any[];
  numberOfElements: number;
  empty: boolean;
}

export interface Content {
  id: number;
  orderChannel: string;
  payedAt: string;
  mealType: string;
  orderAmount: number;
  payAmount: number;
  orderMenuTitle: string;
  orderStatus: string;
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
      const result = await axios.get<CustomerOrderListResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/order/member/${req.query.id}`,
        {
          params: {
            memberId: req.query.id,
            page: req.query.page,
            size: req.query.size,
            startDate: req.query.startDate,
            endDate: req.query.endDate,
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
  }
}
