export type CalculateOrderAPIResponse = {
  discountInfoList: {
    paymentType:
      | 'ECOUPON'
      | 'VOUCHER'
      | 'PRICE_COUPON'
      | 'MEMBERSHIP_COUPON_PRIVATE'
      | 'POINT'
      | 'HPC_POINT';
    amount: number;
  }[];
};
