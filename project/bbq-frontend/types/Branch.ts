export interface Branch {
  branchId: string;
  brandCode: string;
  familyName: string;
  address: string;
  tel: string;
  familyType: string;
  introduction: string;
  pickupDiscountAmount: number;
  minimumOrderAmount: number;
  latitude: number;
  longitude: number;
  openSchedule: {
    weekdayOpenAt?: string;
    weekdayCloseAt?: string;
    weekendOpenAt?: string;
    weekendCloseAt?: null;
  };
  closeScheduleList: [];
  tempCloseSchedule: {
    startDate?: string;
    endDate?: string;
  };
  seats: number;
  useMembership: boolean;
  isOnlineOrderAvailable: true;
  isNowActive: true;
  isCraftBeerAvailable: true;
  iloveAfrica: true;
  canUseDanalPayment: boolean;
  canUsePaycoPayment: boolean;
  canUsePayCoinPayment: boolean;
  canUseKakaoPayment: boolean;
  canUseNaverPayment: boolean;
  canUseTossPayment: boolean;
  canUseUbPayment: boolean;
  canUseSgPayment: boolean;
}
