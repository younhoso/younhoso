import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface CustomerDetailResponse {
  membershipGradeName: string;
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

export interface CustomerDetailPatch {
  name: string;
  phoneNumber: string;
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
      const result = await axios.get<CustomerDetailResponse>(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/customer/${req.query.id}`,
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
      const result = await axios.patch<CustomerDetailPatch>(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/customer/detail/${req.query.id}`,
        req.body as CustomerDetailPatch,
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
  } else if (req.method === 'DELETE') {
    try {
      const result = await axios.delete<CustomerDetailPatch>(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/customer/${req.query.id}`,
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
