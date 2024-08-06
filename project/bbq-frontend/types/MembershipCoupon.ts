export type MembershipCoupon = {
  couponNo: string;
  issuanceType: string;
  couponName: string;
  description: string;
  benefitType: string;
  discountAmount: number;
  discountRate?: number;
  maxDiscountAmount?: number;
  minAmount: number;
  useStartsAt: string;
  useEndsAt: string;
  issuerType: string;
  isUsable: boolean;
  unUsableReason: string;
  calculatedDiscountPrice: number;
  benefitMenuInfo?: {
    menuName: string;
    menuImage?: string;
  };
};
