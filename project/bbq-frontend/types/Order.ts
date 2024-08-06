export interface Order {
  id: number;
  memberId: string;
  memberName: string;
  memberType: string;
  familyInfo: {
    branchId: string;
    branchName: string;
    branchTel: string;
    branchAddress: string;
  };
  orderMenuTitle: string;
  orderStatus: string;
  orderStatusName: string;
  orderFlow: string;
  mealType: string;
  orderChannel: string;
  paymentMethod: string;
  paymentMethodName: string;
  orderAmount: number;
  deliveryFee: number;
  discountAmount: number;
  payAmount: number;
  createdAt: string;
  payedAt: string;
  deliveryAddress: string;
  deliveryAddressDetail: string;
  mobile: string;
  orderMessage: string;
  deliveryMessage: string;
  cancelledAt?: string;
  cancelReason: string;
  estimateMin: number;
  orderMenuList: {
    menuId: number;
    menuName: string;
    menuImageUrl: string;
    menuPrice: number;
    quantity: number;
    menuAndSubOptionPrice: number;
    menuAndSubOptionAndQuantityPrice: number;
    orderSubOptionList: {
      subOptionName: string;
      priority: number;
      orderSubOptionItemList: {
        subOptionItemId?: number;
        subOptionItemName: string;
        subOptionItemPrice: number;
        priority: number;
      }[];
    }[];
  }[];
  orderPaymentInfoResponseList: {
    paymentType: string; // POINT | MEMBERSHIP_COUPON_PUBLIC | REAL_PAYMENT
    paymentName: string;
    payAmount: number;
  }[];
}
