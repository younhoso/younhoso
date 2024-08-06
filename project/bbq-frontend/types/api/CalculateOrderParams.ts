export type CalculateOrderAPIParams = {
  totalCartPrice: number;
  deliveryFee: number;
  takeoutDiscountAmount: number;
  membershipCouponList: number[];
  ecouponList: number[];
  voucherList: number[];
  priceCouponList: number[];
  point: number;
  hpcPoint: number;
};
