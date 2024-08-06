import { CartItem } from '../CartItem';
import { MembershipCoupon } from '../MembershipCoupon';
import { PriceCoupon } from '../PriceCoupon';
import { VoucherCoupon } from '../VoucherCoupon';

export type InitOrderAPIParams = {
  mealType: string; //ex."DELIVERY";
  orderFlow: string; //ex."DIRECT";
  branchId: string;
  deliveryAddress?: string;
  deliveryAddressDetail?: string;
  ecouponList: string[];
  cartList: {
    mainMenuId: number;
    quantity: number;
    subOptionItemIdSet: number[];
  }[];
};

export type InitOrderAPIResponse = {
  mealType: string;
  familyInfo: FamilyInfo;
  memberInfo: MemberInfo;
  deliveryInfo: DeliveryInfo;
  receiverPhoneNumber: string;
  cartResponseInfo: CartResponseInfo;
  membershipCouponInfoList: MembershipCoupon[];
  voucherInfoList: VoucherCoupon[];
  priceCouponInfoList: PriceCoupon[];
  takeoutDiscountPrice: number;
  ecouponDiscountPrice: number;
  availablePaymentMethodList: AvailablePaymentMethodList[];
};

interface AvailablePaymentMethodList {
  paymentMethod: string;
  paymentMethodName: string;
}

interface CartResponseInfo {
  totalPrice: number;
  ecouponDiscountPrice: number;
  discountPrice: number;
  deliveryFee: number;
  responseList: CartItem[];
  familyInfoResponse: FamilyInfoResponse;
}

interface FamilyInfoResponse {
  changeable: boolean;
  branchId: string;
  address: string;
  branchName: string;
  isAddPrice: boolean;
}

interface DeliveryInfo {
  deliveryFullAddress: string;
  deliveryDetailAddress: string;
  deliveryFee: number;
}

interface FamilyInfo {
  branchId: string;
  branchName: string;
  branchTel: string;
  branchAddress: string;
}

interface MemberInfo {
  memberId: string;
  memberType: string;
  username: string;
  name: string;
  phoneNumber: string;
  earnPointRate: number;
  earnPointType: string;
  isFallbackResponse: boolean;
}
