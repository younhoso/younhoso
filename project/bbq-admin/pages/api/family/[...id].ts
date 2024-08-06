import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface FamilyDetailResponse {
  familyName: string;
  ownerName: string;
  address: string;
  tel: string;
  phoneNumber: string;
  defaultDeliveryFee: number;
  isOnlineOrderAvailable: boolean;
  isUseDanalPayment: boolean;
  isUsePaycoPayment: boolean;
  isUsePayCoinPayment: boolean;
  isUseKakaoPayment: boolean;
  isUseNaverPayment: boolean;
  isUseTossPayment: boolean;
  isUseUbPayment: boolean;
  isUseSgPayment: boolean;
  danalPayment: DanalPayment;
  paycoPayment: PaycoPayment;
  payCoinPayment: Payment;
  naverPayment: Payment;
  kakaoPayment: Payment;
  tossPayment: TossPayment;
  sgPayment: SgPayment;
  ubPayment: Payment;
}

export interface DanalPayment {
  cpId: string;
  scpId: string;
}

export interface Payment {
  cpId: string;
}

export interface PaycoPayment {
  sellerKey: string;
  cpId: string;
  itemCd: string;
}

export interface SgPayment {
  merchantKey: string;
}

export interface TossPayment {
  clientKey: string;
  secretKey: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    // secureCookie: process.env.NODE_ENV == 'production' ? true : false
  });

  let id = req.query.id;
  if (req.query.id && req.query.id.length > 1) {
    id = req.query.id[1];
  }

  if (token?.authenticationResponse?.accessToken == undefined)
    return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    try {
      const result = await axios.get<FamilyDetailResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/family/${req.query.id}`,
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
      const result = await axios.patch<FamilyDetailResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/family/${id}`,
        req.body as FamilyDetailResponse,
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
