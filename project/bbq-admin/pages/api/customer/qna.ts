import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface CustomerQnaResponse {
  content: ContentEntity[] | null;
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort?: [] | null;
  number: number;
  first: boolean;
  size: number;
  numberOfElements: number;
  empty: boolean;
}
export interface ContentEntity {
  id: number;
  memberId: string;
  memberType: string;
  name: string;
  phoneNumber: string;
  title: string;
  content: string;
  contentImageUrl1: string;
  contentImageUrl2: string;
  contentImageUrl3: string;
  isAnswered: boolean;
  answeredAt?: string;
  adminAnswer?: string;
  branchId: string;
  familyName: string;
  familyAddress: string;
  familyTel: string;
  createdAt: string;
  isDeleted: boolean;
  category: string;
  answeredBy: string;
}
export interface Pageable {
  sort?: [] | null;
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
      const result = await axios.get<CustomerQnaResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/content/qna`,
        {
          params: {
            page: req.query.page,
            size: req.query.size,
            searchName: req.query.searchName,
            isAnswered: req.query.isAnswered,
            startDate: req.query.startDate,
            endDate: req.query.endDate,
            isDeleted: req.query.isDeleted,
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
  } else if (req.method === 'PATCH') {
    try {
      const result = await axios.patch<CustomerQnaResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/content/qna/${req.body.id}`,
        {
          adminAnswer: req.body.adminAnswer,
          isAnswered: true,
          isDeleted: req.body.isDeleted,
          answeredBy: req.body.answeredBy,
        },
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
        return error;
      }
    }
  }
}
