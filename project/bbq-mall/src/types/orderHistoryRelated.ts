import { NO, YES } from '@/components/AddressAddModal/main/pc/AddressAddModal';
import { KeyofCancelType } from '@/constant/cancelTypeToKr';
import { PgTypes } from '@/constant/paymentRelated';

import { PayType, RefundPayType } from '.';

type KeyOfStatus =
  | 'DEPOSIT_WAIT'
  | 'PAY_DONE'
  | 'PRODUCT_PREPARE'
  | 'DELIVERY_PREPARE'
  | 'DELIVERY_ING'
  | 'DELIVERY_DONE'
  | 'BUY_CONFIRM'
  | 'CANCEL_REQUEST'
  | 'CANCEL_PROC_REQUEST_REFUND'
  | 'CANCEL_PROC_WAITING_REFUND'
  | 'CANCEL_DONE'
  | 'CANCEL_NO_REFUND'
  | 'EXCHANGE_REQUEST'
  | 'EXCHANGE_REJECT_REQUEST'
  | 'EXCHANGE_PROC_BEFORE_RECEIVE'
  | 'EXCHANGE_PROC_REQUEST_PAY'
  | 'EXCHANGE_PROC_REQUEST_REFUND'
  | 'EXCHANGE_PROC_WAITING'
  | 'EXCHANGE_PROC_WAITING_PAY'
  | 'EXCHANGE_PROC_WAITING_REFUND'
  | 'EXCHANGE_DONE'
  | 'EXCHANGE_DONE_PAY_DONE'
  | 'EXCHANGE_DONE_REFUND_DONE'
  | 'RETURN_REQUEST'
  | 'RETURN_REJECT_REQUEST'
  | 'RETURN_PROC_BEFORE_RECEIVE'
  | 'RETURN_PROC_REQUEST_REFUND'
  | 'RETURN_PROC_WAITING_REFUND'
  | 'RETURN_REFUND_AMT_ADJUST_REQUESTED'
  | 'RETURN_DONE'
  | 'RETURN_NO_REFUND';

export type ValueOfStaus =
  | 'CANCEL_ALL'
  | 'CHANGE_ADDRESS'
  | 'EXCHANGE'
  | 'CANCEL'
  | 'DELIVERY_DONE'
  | 'VIEW_DELIVERY'
  | 'RETURN'
  | 'CONFIRM_ORDER'
  | 'WRITE_REVIEW'
  | 'VIEW_CLAIM'
  | 'WITHDRAW_CANCEL'
  | 'WITHDRAW_EXCHANGE'
  | 'WITHDRAW_RETURN';

export const OrderHistoryStatusItem: Record<
  KeyOfStatus,
  Partial<Record<ValueOfStaus | 'DEFAULT', { label: string; onClick: () => void }>> & {
    label: String;
  }
> = {
  DEPOSIT_WAIT: {
    label: '입금대기',
    CANCEL_ALL: {
      label: '취소신청',
      onClick: () => {},
    },
    CHANGE_ADDRESS: {
      label: '배송지변경',
      onClick: () => {},
    },
  },
  PAY_DONE: {
    label: '결제완료',
    EXCHANGE: {
      label: '교환신청',
      onClick: () => {},
    },
    CANCEL: { label: '취소신청', onClick: () => {} },
    CHANGE_ADDRESS: { label: '배송지변경', onClick: () => {} },
  },
  PRODUCT_PREPARE: {
    label: '상품준비중',
    EXCHANGE: { label: '교환신청', onClick: () => {} },
    CANCEL: { label: '취소신청', onClick: () => {} },
  },
  DELIVERY_PREPARE: {
    label: '배송준비중',
    EXCHANGE: { label: '교환신청', onClick: () => {} },
    CANCEL: { label: '취소신청', onClick: () => {} },
  },
  DELIVERY_ING: {
    label: '배송중',
    DELIVERY_DONE: { label: '수취확인', onClick: () => {} },
    VIEW_DELIVERY: { label: '배송조회', onClick: () => {} },
    RETURN: { label: '반품신청', onClick: () => {} },
    EXCHANGE: { label: '교환신청', onClick: () => {} },
    CONFIRM_ORDER: { label: '구매확정', onClick: () => {} },
    WRITE_REVIEW: { label: '후기작성', onClick: () => {} },
  },
  DELIVERY_DONE: {
    label: '배송완료',
    VIEW_DELIVERY: { label: '배송조회', onClick: () => {} },
    CONFIRM_ORDER: { label: '구매확정', onClick: () => {} },
    RETURN: { label: '교환신청', onClick: () => {} },
    EXCHANGE: { label: '반품신청', onClick: () => {} },
    WRITE_REVIEW: { label: '후기작성', onClick: () => {} },
  },
  BUY_CONFIRM: {
    label: '구매확정',
    WRITE_REVIEW: { label: '후기작성', onClick: () => {} },
  },
  CANCEL_REQUEST: {
    label: '취소신청 (승인대기)',
    VIEW_CLAIM: { label: '진행상태 조회', onClick: () => {} },
    WITHDRAW_CANCEL: { label: '취소신청철회', onClick: () => {} },
  },
  CANCEL_PROC_REQUEST_REFUND: {
    label: '취소처리 (환불보류)',
    DEFAULT: { label: '진행상태 조회', onClick: () => {} },
  },
  CANCEL_PROC_WAITING_REFUND: {
    label: '취소처리 (환불없음)',
    DEFAULT: { label: '진행상태 조회', onClick: () => {} },
  },
  CANCEL_DONE: {
    label: '취소완료 (환불완료)',
    VIEW_CLAIM: {
      label: '진행상태 조회',
      onClick: () => {},
    },
  },
  CANCEL_NO_REFUND: {
    label: '취소완료 (환불없음)',
    VIEW_CLAIM: {
      label: '진행상태 조회',
      onClick: () => {},
    },
  },
  EXCHANGE_REQUEST: {
    label: '교환신청 (승인대기)',
    VIEW_CLAIM: {
      label: '진행상태 조회',
      onClick: () => {},
    },
    WITHDRAW_EXCHANGE: {
      label: '교환신청 취소',
      onClick: () => {},
    },
  },
  EXCHANGE_REJECT_REQUEST: {
    label: '교환처리 (철회대기)',
    VIEW_CLAIM: {
      label: '진행상태 조회',
      onClick: () => {},
    },
  },
  EXCHANGE_PROC_BEFORE_RECEIVE: {
    label: '교환처리 (수거진행)',
    DEFAULT: { label: '진행상태 조회', onClick: () => {} },
  },
  EXCHANGE_PROC_REQUEST_PAY: {
    label: '교환처리 (결제대기)',
    DEFAULT: { label: '진행상태 조회', onClick: () => {} },
  },
  EXCHANGE_PROC_REQUEST_REFUND: {
    label: '교환처리 (환불보류)',
    DEFAULT: { label: '진행상태 조회', onClick: () => {} },
  },
  EXCHANGE_PROC_WAITING: {
    label: '교환처리 (처리대기)',
    DEFAULT: { label: '진행상태 조회', onClick: () => {} },
  },
  EXCHANGE_PROC_WAITING_PAY: {
    label: '교환처리 (입금처리대기)',
    DEFAULT: { label: '진행상태 조회', onClick: () => {} },
  },
  EXCHANGE_PROC_WAITING_REFUND: {
    label: '교환처리 (환불대기)',
    DEFAULT: { label: '진행상태 조회', onClick: () => {} },
  },
  EXCHANGE_DONE: {
    label: '교환완료 (차액없음)',
    VIEW_CLAIM: { label: '진행상태 조회', onClick: () => {} },
  },
  EXCHANGE_DONE_PAY_DONE: {
    label: '교환완료 (결제완료)',
    VIEW_CLAIM: { label: '진행상태 조회', onClick: () => {} },
  },
  EXCHANGE_DONE_REFUND_DONE: {
    label: '교환완료 (환불완료)',
    VIEW_CLAIM: { label: '진행상태 조회', onClick: () => {} },
  },
  RETURN_REQUEST: {
    label: '반품신청 (승인대기)',

    VIEW_CLAIM: { label: '진행상태 조회', onClick: () => {} },
    WITHDRAW_RETURN: { label: '반품신청철회', onClick: () => {} },
  },
  RETURN_REJECT_REQUEST: {
    label: '반품신청 (철회대기)',
    VIEW_CLAIM: { label: '진행상태 조회', onClick: () => {} },
  },
  RETURN_PROC_BEFORE_RECEIVE: {
    label: '반품처리 (수거진행)',
    DEFAULT: { label: '진행상태 조회', onClick: () => {} },
  },
  RETURN_PROC_REQUEST_REFUND: {
    label: '반품처리 (환불보류)',
    DEFAULT: { label: '진행상태 조회', onClick: () => {} },
  },
  RETURN_PROC_WAITING_REFUND: {
    label: '반품처리 (환불대기)',
    DEFAULT: { label: '진행상태 조회', onClick: () => {} },
  },
  RETURN_REFUND_AMT_ADJUST_REQUESTED: {
    label: '반품처리 (조정요청)',
    DEFAULT: { label: '진행상태 조회', onClick: () => {} },
  },
  RETURN_DONE: {
    label: '반품완료 (환불완료)',
    VIEW_CLAIM: { label: '진행상태 조회', onClick: () => {} },
  },
  RETURN_NO_REFUND: {
    label: '반품완료 (환불없음)',
    VIEW_CLAIM: { label: '진행상태 조회', onClick: () => {} },
  },
};

export type OrderStatusTypeLabel = keyof typeof OrderHistoryStatusItem;

export type NextActionType = Exclude<
  {
    [K in keyof typeof OrderHistoryStatusItem]: keyof (typeof OrderHistoryStatusItem)[K];
  }[OrderStatusTypeLabel],
  'DEFAULT' | 'label'
>;

export const statusList: Record<NextActionType, { label: string; onClick: () => void }> = {
  CANCEL_ALL: { label: '전체 취소 신청', onClick: () => {} },
  CHANGE_ADDRESS: { label: '배송지 변경', onClick: () => {} },
  EXCHANGE: { label: '교환 신청', onClick: () => {} },
  CANCEL: { label: '취소 신청', onClick: () => {} },
  DELIVERY_DONE: { label: '수취 확인', onClick: () => {} },
  VIEW_DELIVERY: { label: '배송 조회', onClick: () => {} },
  RETURN: { label: '반품 신청', onClick: () => {} },
  CONFIRM_ORDER: { label: '구매 확정', onClick: () => {} },
  WRITE_REVIEW: { label: '후기 작성', onClick: () => {} },
  VIEW_CLAIM: { label: '진행 상태 조회', onClick: () => {} },
  WITHDRAW_CANCEL: { label: '취소 신청 철회', onClick: () => {} },
  WITHDRAW_EXCHANGE: { label: '교환 신청 취소', onClick: () => {} },
  WITHDRAW_RETURN: { label: '반품 신청 철회', onClick: () => {} },
};

export interface OrderHistoryOption {
  orderNo: string;
  orderOptionNo: number;
  productNo: number;
  partnerName: null;
  optionNo: number;
  additionalProductNo: number;
  imageUrl: string;
  brandNo: number;
  brandName: string;
  brandNameEn: string;
  productName: string;
  productNameEn: string;
  optionName: string;
  optionValue: string;
  optionUsed: boolean;
  optionType: string;
  orderCnt: number;
  orderStatusType: OrderStatusTypeLabel;
  claimStatusType: null;
  orderStatusDate: {
    registerYmdt: string;
    buyConfirmYmdt: null;
    reviewableYmdt: null;
    payYmdt: null;
    deliveryCompleteYmdt: null;
  };
  claimNo: null;
  accumulationAmt: number;
  refundable: boolean;
  cancelable: boolean;
  exchangeable: boolean;
  returnable: boolean;
  deliveryInternationalYn: boolean;
  reservationDeliveryYmdt: null;
  exchangeYn: typeof YES | typeof NO;
  member: boolean;
  deliverable: boolean;
  inputs: unknown[];
  nextActions: {
    nextActionType: NextActionType;
    uri: string;
    actionGroupType: string;
  }[];
  optionManagementCd: string;
  delivery: {
    invoiceNo: null;
    deliveryCompanyType: null;
    retrieveInvoiceUrl: null;
    deliveryType: string;
    usesShippingInfoLaterInput: boolean;
    deliveryCompanyTypeLabel: null;
  };
  price: {
    standardPrice: number;
    immediateDiscountedPrice: number;
    buyPrice: number;
    standardAmt: number;
    immediateDiscountedAmt: number;
    buyAmt: number;
    salePrice: number;
    addPrice: number;
    immediateDiscountAmt: number;
    additionalDiscountAmt: number;
    accumulationRate: number;
  };
  reservation: boolean;
  isFreeGift: boolean;
  setOptions: {
    mallProductNo: number;
    productManagementCd: string;
    productName: string;
    mallOptionNo: number;
    optionManagementCd: string;
    optionName: string;
    optionValue: string;
    usesOption: boolean;
    count: number;
    optionPrice: number;
    stockNo: number;
    sku: string;
    optionNameForDisplay: string;
  }[];
  isRecurringPayment: boolean;
  holdDelivery: boolean;
  releaseHoldDeliveryYmdt: null;
  orderStatusTypeLabel: OrderStatusTypeLabel;
  claimStatusTypeLabel: null;
  optionTitle: string;
}

export interface OrderHistory {
  orderYmdt: string;
  orderNo: string;
  payType: PayType['payType'];
  pgType: string;
  pgMallKey: string;
  pgOrderNo: string;
  escrow: boolean;
  member: boolean;
  nextActions: {
    nextActionType: NextActionType;
    uri: string;
    actionGroupType: string;
  }[];
  firstOrderAmt: {
    payAmt: number;
    subPayAmt: number;
    standardAmt: number;
    deliveryAmt: number;
    remoteDeliveryAmt: number;
    immediateDiscountAmt: number;
    additionalDiscountAmt: number;
    cartCouponDiscountAmt: number;
    productCouponDiscountAmt: number;
    deliveryCouponDiscountAmt: number;
    totalProductAmt: number;
    chargeAmt: number;
  };
  lastOrderAmt: {
    payAmt: number;
    subPayAmt: number;
    standardAmt: number;
    deliveryAmt: number;
    remoteDeliveryAmt: number;
    immediateDiscountAmt: number;
    additionalDiscountAmt: number;
    cartCouponDiscountAmt: number;
    productCouponDiscountAmt: number;
    deliveryCouponDiscountAmt: number;
    totalProductAmt: number;
    chargeAmt: number;
  };
  extraData: null;
  orderOptions: OrderHistoryOption[];
  orderer: {
    name: string;
    contact1: string;
    contact1LastDigits: string;
    contact2: string | null;
    email: string | null;
    refundAccount: string | null;
  };
  internationalPaymentInfo: {
    currencyCode: string;
    exchangeRate: number;
    exchangedAmt: number;
  };
  payTypeLabel: string;
}

export interface OrderOption {
  orderNo: string;
  orderOptionNo: number;
  productNo: number;
  partnerName: string;
  optionNo: number;
  additionalProductNo: number;
  imageUrl: string;
  brandNo: number;
  brandName: string;
  brandNameEn: string;
  productName: string;
  productNameEn: string;
  optionName: string;
  optionValue: string;
  optionUsed: boolean;
  optionType: string;
  orderCnt: number;
  orderStatusType: OrderStatusTypeLabel;
  claimStatusType: null;
  orderStatusDate: {
    registerYmdt: string;
    buyConfirmYmdt: null;
    reviewableYmdt: null;
    payYmdt: null;
    deliveryCompleteYmdt: null;
  };
  claimNo: null;
  accumulationAmt: number;
  refundable: boolean;
  cancelable: boolean;
  exchangeable: boolean;
  returnable: boolean;
  deliveryInternationalYn: boolean;
  reservationDeliveryYmdt: null;
  exchangeYn: string;
  member: boolean;
  deliverable: boolean;
  inputs: {
    inputLabel: string;
    inputValue: string;
  }[];
  nextActions: {
    nextActionType: NextActionType;
    uri: string;
    actionGroupType: string;
  }[];
  optionManagementCd: string;
  delivery: {
    invoiceNo: null;
    deliveryCompanyType: null;
    retrieveInvoiceUrl: string;
    deliveryType: string;
    usesShippingInfoLaterInput: boolean;
    deliveryCompanyTypeLabel: null;
  };
  price: {
    standardPrice: number;
    immediateDiscountedPrice: number;
    buyPrice: number;
    standardAmt: number;
    immediateDiscountedAmt: number;
    buyAmt: number;
    salePrice: number;
    addPrice: number;
    immediateDiscountAmt: number;
    additionalDiscountAmt: number;
    accumulationRate: number;
  };
  reservation: boolean;
  isFreeGift: boolean;
  setOptions: [
    {
      mallProductNo: number;
      productManagementCd: string;
      productName: string;
      mallOptionNo: number;
      optionManagementCd: string;
      optionName: string;
      optionValue: string;
      usesOption: boolean;
      count: number;
      optionPrice: number;
      stockNo: number;
      sku: string;
      optionNameForDisplay: string;
    },
  ];
  isRecurringPayment: boolean;
  holdDelivery: boolean;
  releaseHoldDeliveryYmdt: null;
  orderStatusTypeLabel: OrderStatusTypeLabel;
  claimStatusTypeLabel: null;
  optionTitle: string;
}

export interface OrderHistoryDetail {
  orderNo: string;
  orderYmdt: string;
  paymentExpirationYmdt: null;
  payType: string;
  payInfo: {
    payType: string;
    cardInfo: null;
    bankInfo: {
      bank: string;
      bankCode: string;
      bankName: string;
      account: string;
      bankAmt: number;
      depositAmt: number;
      depositYmdt: string;
      remitterName: string;
      depositorName: string;
      paymentExpirationYmdt: string;
    };
    naverPayInfo: null;
    cashAuthNo: null;
    cashNo: null;
    tradeNo: null;
    escrowYn: string;
    payAmt: number;
    sellerCouponAmt: number;
    pgCouponAmt: number;
    cardCouponAmt: number;
    pointAmt: number;
    taxType: null;
    mobileInfo: null;
    rentalInfo: null;
  };
  internationalPayInfo: null;
  pgType: string;
  pgMallKey: string;
  pgOrderNo: string;
  escrow: boolean;
  orderMemo: string;
  orderOptionsGroupByPartner: {
    partnerNo: number;
    partnerName: string;
    orderOptionsGroupByDelivery: {
      deliveryNo: number;
      deliveryAmt: number;
      remoteDeliveryAmt: number;
      returnDeliveryAmt: number;
      deliveryType: string;
      deliveryCompanyType: string;
      invoiceNo: string;
      deliveryPayType: string;
      deliveryMemo: null;
      retrieveInvoiceUrl: string;
      orderOptions: OrderOption[];

      receiverName: string;
      receiverContact1: string;
      receiverContact2: string;
      receiverAddress: string;
      receiverZipCd: string;
      receiverDetailAddress: string;
      receiverJibunAddress: null;
      requestShippingDate: null;
      usesShippingInfoLaterInput: boolean;
      shippingAreaType: string;
      partnerNo: number;
      partnerName: string;
      deliveryCompanyTypeLabel: string;
      shippingMethodType: null;
      shippingMethodLabel: null;
      frontDisplayText: null;
    }[];
  }[];
  guestToken: null;
  refundInfos?: {
    claimNo: number;
    productAmtInfo: {
      immediateDiscountedPrice: number;
      discountAmt: number;
      standardPrice: number;
      immediateDiscountAmt: number;
      additionalDiscountAmt: number;
      productCouponDiscountAmt: number;
      exchangeImmediateDiscountedPrice: number;
      returnImmediateDiscountedPrice: number;
      exchangeDiscountAmt: number;
      exchangeAdjustAmt: number;
      totalAmt: number;
    };
    deliveryAmtInfo: {
      beforeDeliveryAmt: number;
      afterDeliveryAmt: number;
      refundDeliveryAmt: number;
      payOnDelivery: boolean;
      sellerFault: boolean;
      returnDeliveryAmt: number;
      returnAdjustAmt: number;
      buyerReturn: boolean;
      exchangeDeliveryAmt: number;
      exchangeAdjustAmt: number;
      totalAmt: number;
    };
    subtractionAmtInfo: {
      cartCouponAmt: number;
      deliveryCouponAmt: number;
      refundAdjustAmt: number;
      refundAdjustReason: string;
      totalAmt: number;
    };
    returnWayType: string;
    returnAddress: {
      name: string;
      contact1: string;
      contact2: null;
      zipCd: string;
      address: string;
      jibunAddress: string;
      detailAddress: string;
      note: string;
      addressStr: string;
      customsIdNumber: null;
    };
    returnInvoiceNo: null;
    returnDeliveryCompanyTypeLabel: null;
    exchangeAddress: {
      name: string;
      contact1: string;
      contact2: null;
      zipCd: string;
      address: string;
      jibunAddress: string;
      detailAddress: string;
      note: string;
      addressStr: string;
      customsIdNumber: null;
    };
    claimImageUrls: [];
    exchangeOrderOption: null;
    claimClassType: null;
    refundBankAccount: {
      bank: string;
      bankAccount: string;
      bankDepositorName: string;
      bankName: string;
    };
    refundPayAmt: number;
    refundSubPayAmt: number;
    refundType: string;
    refundPayType: RefundPayType;
    refundTypeLabel: string;
    refundMainPayAmt: number;
    refundOrderOptions: [];
  }[];
  additionalPayInfos: {
    claimNo: number;
    productAmtInfo: {
      immediateDiscountedPrice: number;
      discountAmt: number;
      standardPrice: number;
      immediateDiscountAmt: number;
      additionalDiscountAmt: number;
      productCouponDiscountAmt: number;
      exchangeImmediateDiscountedPrice: number;
      returnImmediateDiscountedPrice: number;
      exchangeDiscountAmt: number;
      exchangeAdjustAmt: number;
      totalAmt: number;
    };
    deliveryAmtInfo: {
      beforeDeliveryAmt: number;
      afterDeliveryAmt: number;
      refundDeliveryAmt: number;
      payOnDelivery: boolean;
      sellerFault: boolean;
      returnDeliveryAmt: number;
      returnAdjustAmt: number;
      buyerReturn: boolean;
      exchangeDeliveryAmt: number;
      exchangeAdjustAmt: number;
      totalAmt: number;
    };
    subtractionAmtInfo: {
      cartCouponAmt: number;
      deliveryCouponAmt: number;
      refundAdjustAmt: number;
      refundAdjustReason: string;
      totalAmt: number;
    };
    returnWayType: null;
    returnAddress: {
      name: string;
      contact1: string;
      contact2: null;
      zipCd: string;
      address: string;
      jibunAddress: string;
      detailAddress: string;
      note: string;
      addressStr: string;
      customsIdNumber: null;
    };
    returnInvoiceNo: null;
    returnDeliveryCompanyTypeLabel: null;
    exchangeAddress: {
      name: string;
      contact1: string;
      contact2: null;
      zipCd: string;
      address: string;
      jibunAddress: string;
      detailAddress: string;
      note: string;
      addressStr: string;
      customsIdNumber: null;
    };
    claimImageUrls: [];
    exchangeOrderOption: null;
    claimClassType: null;
    bankAccount: {
      bank: string;
      bankAccount: string;
      bankDepositorName: string;
      bankName: string;
    };
    remitter: string;
    payType: string;
    exchangePayAmt: number;
  }[];
  exchangePayInfos: {
    exchangePayAmt: number;
    payType: string;
    bankAccount: {
      bank: string;
      bankAccount: string;
      bankDepositorName: string;
      bankName: string;
    };
    remitter: string;
  }[];
  member: boolean;
  firstOrderAmount: {
    payAmt: number;
    subPayAmt: number;
    standardAmt: number;
    deliveryAmt: number;
    remoteDeliveryAmt: number;
    immediateDiscountAmt: number;
    additionalDiscountAmt: number;
    cartCouponDiscountAmt: number;
    productCouponDiscountAmt: number;
    deliveryCouponDiscountAmt: number;
    totalProductAmt: number;
    chargeAmt: number;
  };
  lastOrderAmount: {
    payAmt: number;
    subPayAmt: number;
    standardAmt: number;
    deliveryAmt: number;
    remoteDeliveryAmt: number;
    immediateDiscountAmt: number;
    additionalDiscountAmt: number;
    cartCouponDiscountAmt: number;
    productCouponDiscountAmt: number;
    deliveryCouponDiscountAmt: number;
    totalProductAmt: number;
    chargeAmt: number;
  };
  shippingAddress: {
    addressNo: number;
    receiverZipCd: string;
    receiverAddress: string;
    receiverJibunAddress: string;
    receiverDetailAddress: string;
    receiverName: string;
    addressName: null;
    receiverContact1: string;
    receiverContact2: null;
    customsIdNumber: null;
    countryCd: string;
  };
  orderer: {
    ordererName: string;
    ordererContact1: string;
    ordererContact2: null;
    ordererEmail: string;
  };
  billingAddress: null;
  nextActions: {
    nextActionType: NextActionType;
    uri: string;
    actionGroupType: string;
  }[];
  receiptInfos: {
    receiptType: string;
    url: string;
  }[];
  claimReasonTypes: {
    claimReasonType: KeyofCancelType;
    label: string;
    responsibleObjectType: string;
  }[];
  refundType: string;
  refundPayType: RefundPayType;
  refundTypeLabel: string;
  memo: string;
  deliveryMemo: string;
  extraData: {};
  availableBanks: {
    bank: string;
    label: string;
  }[];
  payTypeLabel: string;
  insurance: {
    no: null;
    type: null;
    url: null;
  };
  requireCustomsIdNumber: boolean;
  defaultOrderStatusType: OrderStatusTypeLabel;
  accumulationAmtWhenBuyConfirm: number;
}

export interface ClaimDetail {
  orderProductOptionNo: 49164499;
  claimNo: 3445763;
  claimType: 'CANCEL';
  refundType: PgTypes;
  claimedOption: {
    orderNo: '202312291513069228';
    orderOptionNo: 49164499;
    productNo: 115614455;
    optionNo: 145183243;
    additionalProductNo: 0;
    imageUrl: '//rlyfaazj0.toastcdn.net/20231213/155053.61153000/829_temp_16734858947164view.png';
    brandName: null;
    productName: '[현명한특가] (소비기한임박상품) TEST상품 1';
    productNameEn: '';
    optionName: '타이틀';
    optionValue: 'BBQ 닭가슴살 소시지 TEST 11';
    orderCnt: 2;
    orderStatusType: 'CANCEL_DONE';
    claimStatusType: 'CANCEL_DONE';
    claimNo: 3445763;
    accumulationAmt: 0;
    refundable: true;
    cancelable: true;
    exchangeable: true;
    returnable: true;
    deliveryInternationalYn: false;
    reservationDeliveryYmdt: null;
    exchangeYn: 'N';
    deliverable: true;
    delivery: {
      invoiceNo: null;
      deliveryCompanyType: 'LOTTE';
      retrieveInvoiceUrl: null;
      deliveryCompanyTypeLabel: '롯데택배';
      receiverInputLater: false;
    };
    price: {
      salePrice: 10000.0;
      addPrice: 1000.0;
      immediateDiscountAmt: 2000.0;
      additionalDiscountAmt: 0.0;
      accumulationRate: 7.0;
      standardPrice: 11000.0;
      immediateDiscountedPrice: 9000.0;
      buyPrice: 9000.0;
      standardAmt: 22000.0;
      immediateDiscountedAmt: 18000.0;
      buyAmt: 18000.0;
    };
    orderStatusDate: {
      registerYmdt: '2023-12-29 15:13:07';
      buyConfirmYmdt: null;
      reviewableYmdt: null;
    };
    optionManagementCd: '';
    brandNameEn: null;
    reservation: false;
    optionTitle: '타이틀: BBQ 닭가슴살 소시지 TEST 11';
    inputs: [
      {
        inputLabel: '타이틀';
        inputValue: 'BBQ 닭가슴살 소시지 TEST 11';
      },
    ];
    nextActions: [
      {
        nextActionType: 'VIEW_CLAIM';
        uri: '/profile/order-options/49164499/claim/result';
      },
    ];
    optionType: 'NORMAL_OPTION';
    member: true;
    optionUsed: true;
    pgType: 'KCP';
    payType: 'CREDIT_CARD';
    claimReasonType: KeyofCancelType;
    claimReasonDetail: '단순 변심';
    isFreeGift: false;
    shippingAreaType: 'MALL_SHIPPING_AREA';
    isQuantityDiscount: false;
    claimStatusTypeLabel: '취소완료[환불완료]';
  };
  claimedOptions: [
    {
      orderNo: '202312291513069228';
      orderOptionNo: 49164499;
      productNo: 115614455;
      optionNo: 145183243;
      additionalProductNo: 0;
      imageUrl: '//rlyfaazj0.toastcdn.net/20231213/155053.61153000/829_temp_16734858947164view.png';
      brandName: null;
      productName: '[현명한특가] (소비기한임박상품) TEST상품 1';
      productNameEn: '';
      optionName: '타이틀';
      optionValue: 'BBQ 닭가슴살 소시지 TEST 11';
      orderCnt: 2;
      orderStatusType: 'CANCEL_DONE';
      claimStatusType: 'CANCEL_DONE';
      claimNo: 3445763;
      accumulationAmt: 0;
      refundable: true;
      cancelable: true;
      exchangeable: true;
      returnable: true;
      deliveryInternationalYn: false;
      reservationDeliveryYmdt: null;
      exchangeYn: 'N';
      deliverable: true;
      delivery: {
        invoiceNo: null;
        deliveryCompanyType: 'LOTTE';
        retrieveInvoiceUrl: null;
        deliveryCompanyTypeLabel: '롯데택배';
        receiverInputLater: false;
      };
      price: {
        salePrice: 10000.0;
        addPrice: 1000.0;
        immediateDiscountAmt: 2000.0;
        additionalDiscountAmt: 0.0;
        accumulationRate: 7.0;
        standardPrice: 11000.0;
        immediateDiscountedPrice: 9000.0;
        buyPrice: 9000.0;
        standardAmt: 22000.0;
        immediateDiscountedAmt: 18000.0;
        buyAmt: 18000.0;
      };
      orderStatusDate: {
        registerYmdt: '2023-12-29 15:13:07';
        buyConfirmYmdt: null;
        reviewableYmdt: null;
      };
      optionManagementCd: '';
      brandNameEn: null;
      reservation: false;
      optionTitle: '타이틀: BBQ 닭가슴살 소시지 TEST 11';
      inputs: [
        {
          inputLabel: '타이틀';
          inputValue: 'BBQ 닭가슴살 소시지 TEST 11';
        },
      ];
      nextActions: [
        {
          nextActionType: 'VIEW_CLAIM';
          uri: '/profile/order-options/49164499/claim/result';
        },
      ];
      optionType: 'NORMAL_OPTION';
      member: true;
      optionUsed: true;
      pgType: 'KCP';
      payType: 'CREDIT_CARD';
      claimReasonType: KeyofCancelType;
      claimReasonDetail: '단순 변심';
      isFreeGift: false;
      shippingAreaType: 'MALL_SHIPPING_AREA';
      isQuantityDiscount: false;
      claimStatusTypeLabel: '취소완료[환불완료]';
    },
    {
      orderNo: '202312291513069228';
      orderOptionNo: 49164501;
      productNo: 115693907;
      optionNo: 144427449;
      additionalProductNo: 0;
      imageUrl: '//rlyfaazj0.toastcdn.net/20231219/151342.580655000/_temp_16502714116783view.png';
      brandName: null;
      productName: '[냉동] BBQ 쫄깃 닭발 편육 150g 5팩';
      productNameEn: '';
      optionName: '[냉동] BBQ 쫄깃 닭발 편육 150g 5팩';
      optionValue: '[냉동] BBQ 쫄깃 닭발 편육 150g 5팩';
      orderCnt: 1;
      orderStatusType: 'CANCEL_DONE';
      claimStatusType: 'CANCEL_DONE';
      claimNo: 3445763;
      accumulationAmt: 0;
      refundable: true;
      cancelable: true;
      exchangeable: true;
      returnable: true;
      deliveryInternationalYn: false;
      reservationDeliveryYmdt: null;
      exchangeYn: 'N';
      deliverable: true;
      delivery: {
        invoiceNo: null;
        deliveryCompanyType: 'LOTTE';
        retrieveInvoiceUrl: null;
        deliveryCompanyTypeLabel: '롯데택배';
        receiverInputLater: false;
      };
      price: {
        salePrice: 10000.0;
        addPrice: 0.0;
        immediateDiscountAmt: 2000.0;
        additionalDiscountAmt: 0.0;
        accumulationRate: 7.0;
        standardPrice: 10000.0;
        immediateDiscountedPrice: 8000.0;
        buyPrice: 8000.0;
        standardAmt: 10000.0;
        immediateDiscountedAmt: 8000.0;
        buyAmt: 8000.0;
      };
      orderStatusDate: {
        registerYmdt: '2023-12-29 15:13:07';
        buyConfirmYmdt: null;
        reviewableYmdt: null;
      };
      optionManagementCd: '';
      brandNameEn: null;
      reservation: false;
      optionTitle: '[냉동] BBQ 쫄깃 닭발 편육 150g 5팩';
      inputs: [
        {
          inputLabel: '[냉동] BBQ 쫄깃 닭발 편육 150g 5팩';
          inputValue: '[냉동] BBQ 쫄깃 닭발 편육 150g 5팩';
        },
      ];
      nextActions: [
        {
          nextActionType: 'VIEW_CLAIM';
          uri: '/profile/order-options/49164501/claim/result';
        },
      ];
      optionType: 'PRODUCT_ONLY';
      member: true;
      optionUsed: false;
      pgType: 'KCP';
      payType: 'CREDIT_CARD';
      claimReasonType: KeyofCancelType;
      claimReasonDetail: '단순 변심';
      isFreeGift: false;
      shippingAreaType: 'MALL_SHIPPING_AREA';
      isQuantityDiscount: false;
      claimStatusTypeLabel: '취소완료[환불완료]';
    },
  ];
  claimReasonType: KeyofCancelType;
  claimReasonDetail: '단순 변심';
  claimClassType: 'OPTION_CANCEL';
  claimYmdt: '2023-12-29 15:41:24';
  returnDelivery: null;
  claimPriceInfo: {
    productAmtInfo: {
      standardPrice: 32000;
      immediateDiscountAmt: 6000;
      additionalDiscountAmt: 0;
      productCouponDiscountAmt: number;
      exchangeAdjustAmt: 0;
      freeGiftDiscountAmt: 0;
      exchangeImmediateDiscountedPrice: 0;
      exchangeDiscountAmt: 0;
      immediateDiscountedPrice: 26000;
      totalAmt: 26000;
      discountAmt: 0;
    };
    deliveryAmtInfo: {
      beforeDeliveryAmt: 3000;
      afterDeliveryAmt: 3000;
      refundDeliveryAmt: 0;
      payOnDelivery: false;
      sellerFault: false;
      returnDeliveryAmt: 0;
      returnAdjustAmt: 0;
      buyerReturn: false;
      exchangeDeliveryAmt: 0;
      exchangeAdjustAmt: 0;
      beforeRemoteDeliveryAmt: 0;
      afterRemoteDeliveryAmt: 0;
      totalAmt: 0;
    };
    subtractionAmtInfo: {
      cartCouponAmt: number;
      deliveryCouponAmt: 0;
      refundAdjustAmt: 0;
      refundAdjustReason: null;
      totalAmt: 0;
    };
    refundPayAmt: 26000;
    refundSubPayAmt: number;
    refundType: 'KCP';
    refundPayType: RefundPayType;
    refundTypeLabel: '신용카드';
    additionalPayAmt: 0;
    refundMainPayAmt: 26000;
  };
  returnWayType: null;
  returnAddress: null;
  exchangeBeforeDelivery: false;
  claimImageUrls: null;
}
