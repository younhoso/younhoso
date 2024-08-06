import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface FamilyListResponse {
  content: ContentEntity[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort?: [];
  first: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  empty: boolean;
}
export interface ContentEntity {
  branchId: string;
  brandCode: string;
  familyName: string;
  ownerName: string;
  address: string;
  tel: string;
  phoneNumber: string;
  supervisorName: string;
  supervisorTel: string;
  familyType: string;
  introduction: string;
  isAddPrice: boolean;
  pickupDiscountAmount: number;
  latitude: number;
  longitude: number;
  brn: string;
  defaultDeliveryFee: number;
  minimumOrderAmount: number;
  openSchedule: OpenSchedule;
  closeScheduleList?: [];
  tempCloseSchedule: TempCloseSchedule;
  seats: number;
  useMembership: boolean;
  isAvailable: boolean;
  isOnlineOrderAvailable: boolean;
  isNowActive: boolean;
  isCraftBeerAvailable: boolean;
  iloveAfrica: boolean;
  addressState: string;
  familyImageUrl: string;
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
  payCoinPayment: PayCoinPaymentOrNaverPaymentOrKakaoPaymentOrUbPayment;
  naverPayment: PayCoinPaymentOrNaverPaymentOrKakaoPaymentOrUbPayment;
  kakaoPayment: PayCoinPaymentOrNaverPaymentOrKakaoPaymentOrUbPayment;
  tossPayment: TossPayment;
  sgPayment: SgPayment;
  ubPayment: PayCoinPaymentOrNaverPaymentOrKakaoPaymentOrUbPayment;
  deliveryFeeByAddresses: DeliveryFeeByAddressesEntity[];
}

export interface DeliveryFeeByAddressesEntity {
  legalDongId: string;
  legalDongName: string;
  administrativeDongId: string;
  administrativeDongName: string;
  additionalDeliveryFee: string;
}

export interface OpenSchedule {
  weekdayOpenAt?: string;
  weekdayCloseAt?: string;
  weekendOpenAt?: string;
  weekendCloseAt?: string;
}
export interface TempCloseSchedule {
  startDate?: string;
  endDate?: string;
}
export interface DanalPayment {
  cpId: string;
  scpId: string;
}
export interface PaycoPayment {
  sellerKey: string;
  cpId: string;
  itemCd: string;
}
export interface PayCoinPaymentOrNaverPaymentOrKakaoPaymentOrUbPayment {
  cpId: string;
}
export interface TossPayment {
  clientKey: string;
  secretKey: string;
}
export interface SgPayment {
  merchantKey: string;
}
export interface Pageable {
  sort?: [];
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
      const result = await axios.get<FamilyListResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/family`,
        {
          params: {
            page: req.query.page,
            size: req.query.size,
            searchName: req.query.searchName,
            isAvailable: req.query.isAvailable,
            addressState: req.query.addressState,
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
