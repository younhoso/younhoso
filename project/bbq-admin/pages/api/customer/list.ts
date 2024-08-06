import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface CustomerListResponse {
  content: Content[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  number: number;
  first: boolean;
  sort: any[];
  size: number;
  numberOfElements: number;
  empty: boolean;
}

export interface Content {
  memberId: string;
  username: string;
  nickname: string;
  email: string;
  name: string;
  phoneNumber: string;
  birth: string;
  gender: string;
  joinAt: string;
  lastLoginAt: string;
  isActive: boolean;
  isIntegratedMember: boolean;
  smsMarketingAgreedAt: string;
  emailMarketingAgreedAt: string;
  pushMarketingAgreedAt: string;
  isSmsAgreed: boolean;
  isEmailAgreed: boolean;
  isPushAgreed: boolean;
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
      const result = await axios.get<CustomerListResponse>(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/customer`,
        {
          params: {
            page: req.query.page,
            size: req.query.size,
            sort: req.query.sort,
            searchName: req.query.searchName,
            smsAgreed: req.query.smsAgreed,
            emailAgreed: req.query.emailAgreed,
            pushAgreed: req.query.pushAgreed,
            gender: req.query.gender,
            startDate: req.query.startDate,
            endDate: req.query.endDate,
            integratedMember: req.query.integratedMember,
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
  }
}
