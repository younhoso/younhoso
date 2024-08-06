import { NO, YES } from '@/components/AddressAddModal/main/pc/AddressAddModal';
import { bankList } from '@/constant/bankList';
import { MemberGradeList } from '@/constant/memberGradeImageList';
import { PgTypes } from '@/constant/paymentRelated';

import { ArrayElement } from './arrayElement';
import { Product } from './categorymenu';
import { OrderStatusTypeLabel } from './orderHistoryRelated';

export type RefundPayType = 'CANCEL_DEPOSIT' | 'CASH' | 'CREDIT_CARD';

export interface SimpleCategory {
  displayCategoryName: string;
  displayCategoryNo: number;
}

export interface DetailCategory {
  categoryNo: number;
  flatCategories: unknown[];
  multiLevelCategories: MultiLevelCategory[];
}

export interface MultiLevelCategory {
  categoryNo: number;
  children: MultiLevelCategory[];
  content: string;
  depth: number;
  icon: string;
  label: string;
}

export interface BoardConfig {
  attachmentUsed: boolean;
  boardId: string;
  boardNo: number;
  categories: unknown[];
  categoryUsed: boolean;
  displayType: string;
  guestPostingUsed: boolean;
  imageDisplayType: string;
  memberPostingUsed: boolean;
  name: string;
  order: number;
  replyUsed: boolean;
  secretPostingUsed: boolean;
  thumbnailUsed: boolean;
  used: boolean;
}

export interface InquiryCategory {
  boardConfigs: BoardConfig[];
}

export interface AuthBody {
  memberId: string;
  password: string;
  keepLogin: boolean;
  captcha: null;
  provider: null;
}

export interface AuthRes {
  accessToken: string;
}

export interface MyData {
  memberGradeName: MemberGradeList;
  memberName: string;
  mobileNo: string;
  email: string;
}

export interface SectionList {
  sectionId: string;
  sectionName: string;
  sectionNo: number;
}

export interface SectionDetail {
  label: string;
  products: Product[];
}

export interface CartProductP {
  price: {
    salePrice: number;
    immediateDiscountAmt: number;
    buyAmt: number;
    standardAmt: number;
    addPrice: number;
  };
  stockCnt: number;
  cartNo: number;
  imageUrl: string;
  optionName: string;
  optionTitle: string;
  optionValue: string;
  orderCnt: number;
  productNo: number;
  optionNo: number;
  soldOut: boolean;
  optionInputs: {
    inputValue: string;
    inputLabel: string;
  }[];
  validInfo: {
    errorCode: string | null;
    valid: boolean;
    message: string;
  };
}

export interface CartPrice {
  buyAmt: number;
  accumulationAmtWhenBuyConfirm: number;
  standardAmt: number;
  discountAmt: number;
  totalDeliveryAmt: number;
  totalPrePaidDeliveryAmt: number;
  totalPayOnDeliveryAmt: number;
  totalAmt: number;
}

export interface OrderproductType {
  productName: string;
  productNo: number;
  imageUrl: string;
  orderProductOptions: CartProductP[];
}

export interface DeliveryGroup {
  orderProducts: OrderproductType[];
  deliveryAmt: number;
  deliveryPayType: string;
  deliveryCondition: unknown;
  partnerName: string;
  partnerNo: number;
  deliveryTemplateNo: number;
  deliveryTemplateGroupNo: number;
  buyAmt: number;
}

export interface Cart {
  deliveryGroups: DeliveryGroup[];
  invalidProducts: OrderproductType[];
  price: CartPrice;
}

export interface CartBody {
  cartNo: number;
  orderCnt: number;
  optionInputs: {
    inputLabel: string;
    inputValue: string;
  }[];
}

export interface BoardItems {
  articleNo: number;
  content: string;
  registerType: string;
  imageUrl: string;
  notice: boolean;
  registerYmdt: string;
  title: string;
}

export interface InquiryType {
  inquiryTypeDescription: string | null;
  inquiryTypeName: string;
  inquiryTypeNo: number;
}

export interface Inquiry {
  inquiryNo: number;
  inquiryTitle: string;
  registerYmdt: string;
  answer: {
    answerContent: string;
    answerRegisterYmdt: string;
  };
  inquiryType: InquiryType;
  originalImageUrls: string[];
  inquiryContent: string;
  answerEmailSend: boolean;
  answerSmsSend: boolean;
}

export interface InquiryBody {
  memberName: string;
  mobileNo: string;
  email: string;
  answerSmsSendYn?: boolean;
  answerEmailSendYn: boolean;
  inquiryTypeNo: number;
  inquiryTitle: string;
  inquiryContent: string;
  fileList: string[];
  inquiryList: InquiryType[];
}

interface ProductsBody extends Omit<CartBody, 'cartNo'> {
  rentalInfos: never[];
  productNo: number | null;
  optionNo: number;
}

export interface OrderBody {
  cartNos: number[];
  products: ProductsBody[];
}

export interface PayType {
  payType:
    | 'ACCOUNT'
    | 'CREDIT_CARD'
    | 'REALTIME_ACCOUNT_TRANSFER'
    | 'VIRTUAL_ACCOUNT'
    | 'ESCROW_REALTIME_ACCOUNT_TRANSFER'
    | 'ESCROW_VIRTUAL_ACCOUNT'
    | 'PAYCO'
    | 'KAKAO_PAY';
  payTypeLabel: string;
  pgTypes: PgTypes;
}

export interface PaymentInfo {
  deliveryAmt: number;
  totalStandardAmt: number;
  totalImmediateDiscountAmt: number;
  paymentAmt: number;
  usedAccumulationAmt: number;
  productAmt: number;
  cartCouponAmt: number;
  productCouponAmt: number;
  availableMaxAccumulationAmt: number;
}

export interface OrderSheet {
  ordererContact: {
    ordererContact1: string;
    ordererContact2: string;
    ordererEmail: string;
    ordererName: string;
  };
  orderSheetAddress: {
    mainAddress: Address;
    memberAddress: Address;
    recentAddress: Address[];
  };
  deliveryGroups: DeliveryGroup[];
  paymentInfo: PaymentInfo;
  availablePayTypes: PayType[];
  tradeBankAccountInfos: {
    bankAccount: string;
    bankDepositorName: string;
    bankCode: string;
    bankName: string;
  }[];
}
export interface OrderHistorySummary {
  buyConfirmCnt: number;
  cancelDoneCnt: number;
  cancelProcessingCnt: number;
  deliveryDoneCnt: number;
  deliveryIngCnt: number;
  deliveryPrepareCnt: number;
  depositWaitCnt: number;
  exchangeDoneCnt: number;
  exchangeProcessingCnt: number;
  payDoneCnt: number;
  productPrepareCnt: number;
  returnDoneCnt: number;
  returnProcessingCnt: number;
}

export interface Address {
  addressNo: number;
  memberNo: number;
  mallNo: number;
  registerYmdt: string;

  addressName: string;
  receiverName: string;
  receiverZipCd: string;
  receiverAddress: string;
  receiverDetailAddress: string;
  receiverContact1: string;
  receiverContact2: string;
  defaultYn: typeof NO | typeof YES;
}

export interface AddressList {
  bookedAddresses: Address[];
  defaultAddress?: Address;
  recentAddresses: Address[];
  recurringPaymentAddresses: Address[];
}

export interface AddAddressBody
  extends Pick<
    Address,
    | 'addressName'
    | 'receiverName'
    | 'receiverZipCd'
    | 'receiverAddress'
    | 'receiverDetailAddress'
    | 'receiverContact1'
    | 'receiverContact2'
    | 'defaultYn'
  > {
  addressType: string;
  receiverJibunAddress: string;
  customsIdNumber: string;
  countryCd: string;
}

export type AddressModalState = Pick<
  AddAddressBody,
  'receiverZipCd' | 'receiverAddress' | 'receiverJibunAddress'
>;

export type RestAddressInfo = Pick<
  AddAddressBody,
  'receiverDetailAddress' | 'defaultYn' | 'receiverName' | 'receiverContact1'
>;

export interface Coupon {
  cartCouponUsable: boolean;
  couponIssueNo: number;
  couponName: string;
  couponNo: number;
  couponTargetType: string;
  couponType: string;
  discountAmt: number;
  discountRate: number;
  fiexdAmt: boolean;
  fixedAmt: boolean;
  freeDelivery: boolean;
  issueYmdt: string;
  limitPayType: null;
  limitPayTypes: [];
  maxDiscountAmt: number;
  maxSalePrice: number;
  memberGradeNames: null;
  memberGroupNames: null;
  minDeliveryAmt: null;
  minSalePrice: number;
  otherCouponUsable: boolean;
  productCouponUsable: boolean;
  reason: string;
  skipsAccumulation: boolean;
  usablePlatforms: string[];
  useEndYmdt: string;
  useYmdt: null;
  used: boolean;
}

export interface LikeItem {
  productNo: number;
  imageUrls: string[];
  productName: string;
  immediateDiscountAmt: number;
  salePrice: number;
}

export interface Reviewable {
  orderNo: string;
  imageUrl: string;
  productName: string;
  orderStatusDate: {
    registerYmdt: string;
    reviewableYmdt: string;
  };
  optionNo: number;
  productNo: number;
  orderOptionNo: number;
  orderStatusType: OrderStatusTypeLabel;
}

export interface Reviewed {
  reviewNo: number;
  productName: string;
  imageUrl: string;
  rate: number;
  registerYmdt: string;
  updateYmdt: string;
  fileUrls: string[];
  content: string;
  productNo: number;
  registerName: string;
  productRate: string;
  orderedOption: orderedOption;
}

export interface orderedOption {
  orderOptionNo: number;
  optionName: string;
  optionValue: string;
}

export interface ModifyReview extends Pick<Reviewed, 'rate' | 'content' | 'fileUrls'> {}

export interface CreateReview extends ModifyReview {
  optionNo: number;
  orderOptionNo: number;
}

export interface ProductInquiry {
  inquiryNo: number;
  blocked: boolean;
  title: string;
  content: string;
  secreted: boolean;
  replied: boolean;
  registerName: string;
  nickName: string;
  registerYmdt: string;
  updateYmdt: string;
  modifiable: boolean;
  productNo: number;
  productName: string;
  imageUrl: string;
  answers?: {
    inquiryNo: number;
    title: string;
    content: string;
    administrator: boolean;
    secreted: boolean;
    memberId: string;
    adminType: string;
    partnerName: string;
    nickName: string;
    registerYmdt: string;
    updateYmdt: string;
  }[];
}

export interface ModifyProductInquiryBody {
  title: string;
  content: string;
  secreted: boolean;
}

export interface MyCoupon {
  couponIssueNo: number;
  couponName: string;
  reason: string;
  couponNo: number;
  couponType: string;
  discountAmt: number; // 할인량
  discountRate: number; // 할인율
  fixedAmt: boolean;
  issueYmdt: string;
  limitPayType: string;
  limitPayTypes: string[];
  maxDiscountAmt: number; // 최대 할인량
  maxSalePrice: number; // 최대 구매 금액
  minSalePrice: number; // 최소 구매 금액
  otherCouponUsable: boolean;
  cartCouponUsable: boolean;
  productCouponUsable: boolean;
  skipsAccumulation: boolean;
  usablePlatforms: string[];
  useEndYmdt: string;
  useYmdt: string;
  used: boolean;
  couponTargetType: string;
  freeDelivery: boolean;
}

export interface DownloadableCoupon {
  couponNo: number;
  couponName: string;
  couponType: string;
  couponTargetType: string;
  allianceRefererType: number;
  discountInfo: {
    fixedAmt: boolean;
    discountAmt: number;
    discountRate: number;
    maxDiscountAmt: number;
    freeDelivery: boolean;
    useOtherCoupon: boolean;
    useCartCoupon: boolean;
    useProductCoupon: boolean;
    skippedAccumulationAmt: boolean;
  };
  dateInfo: {
    issueStartYmdt: string;
    issueEndYmdt: string;
    issueStartHour: number;
    issueEndHour: number;
    issueDaysOfWeek: string;
  };
  useConstraint: {
    useEndYmdt: string | null;
    useDays?: number;
    minSalePrice: number;
    maxSalePrice: number;
    minDeliveryAmt: number;
    limitPayType: string;
    limitPayTypes: string[];
    usablePlatformTypes: string[];
  };
  issueConstraint: {
    memberGradeName: string;
    memberGradeNames: string[];
    memberGroupNames: string[];
    issuablePlatformTypes: string[];
    dailyIssueLimit: boolean;
    dailyIssueLimitCnt: number;
    issuePerPersonLimit: boolean;
    issuePerPersonLimitCnt: number;
    dailyIssuePerPersonLimitCnt: number;
    channelTypes: number;
  };
  couponStatus: {
    totalIssuableCnt: number;
    totalIssuedCnt: number;
    totalIssuedCntToday: number;
    issuableCnt: number;
    myIssuedCnt: number;
    myIssuedCntToday: number;
  };
  downloadable: boolean;
}

export interface TotalCount {
  totalCount: number;
}

export interface TotalCountWithItems<T> extends TotalCount {
  items: T[];
}

export interface PaymentCoupon {
  cartCouponIssueNo: number;
  promotionCode: string;
  productCoupons: {
    productNo: number;
    couponIssueNo: number;
  }[];
}

export const personalCashReceipt = 'INCOME_TAX_DEDUCTION';
export const companyCashReceipt = 'PROOF_EXPENDITURE';

export type CacheReceiptPurpose = typeof personalCashReceipt | typeof companyCashReceipt;

export interface PaymentBody {
  orderSheetNo: string;
  shippingAddress?: Address & {
    usesShippingInfoLaterInput?: boolean;
  };
  orderMemo: string;
  deliveryMemo: string;
  member: boolean;
  orderer: OrderSheet['ordererContact'];
  tempPassword?: string;
  coupons?: PaymentCoupon;
  subPayAmt?: number;
  orderTitle: string;
  pgType: PgTypes | 'NONE';
  payType: PayType['payType'];
  clientReturnUrl: string;
  clientParams?: {};
  extraData?: {};
  savesLastPayType?: boolean;
  applyCashReceipt?: boolean;
  cashReceipt?: {
    cashReceiptKey: string;
    cashReceiptIssuePurposeType: CacheReceiptPurpose | '';
  };
  bankAccountToDeposit?: {
    bankAccount: string;
    bankDepositorName: string;
    bankCode: string;
  };
  remitter?: string;
  customTermsNos?: null;
  agreementTypes?: null;
  agreementTermsTypes?: null;
}

export interface CalculateBody {
  accumulationUseAmt: number;
  addressRequest?: Address & {
    usesShippingInfoLaterInput?: boolean;
  };
  couponRequest?: Partial<PaymentCoupon>;
  shippingAddresses: {
    addressNo?: number;
    addressName?: string;
    useDefaultAddress?: boolean;
    usesShippingInfoLaterInput?: boolean;
    shippingAddress?: Address;
    payProductParams?: {
      productNo: number;
      optionNo: number;
      orderCnt: number;
      optionInputs: {
        inputLabel: string;
        inputValue: string;
      }[];
    }[];
  }[];
}

export interface OrderSheetPrice {
  deliveryGroups: DeliveryGroup[];
  appliedCoupons: PaymentCoupon;
  availablePayTypes: PayType[];
  paymentInfo: PaymentInfo;
}

export type CouponType = Product & {
  optionCnt: number;
  productCoupons: (Coupon & { displayCouponName: string; couponDiscountAmt: number })[];
};

export interface CouponDivided {
  cartCoupons: (Coupon & { couponDiscountAmt: number; displayCouponName: string })[];
  products: CouponType[];
}

export interface ClaimPriceBody {
  claimType: 'CANCEL' | 'RETURN' | 'EXCHANGE';
  productCnt: number;
  claimReasonType: string;
  returnWayType?: 'BUYER_DIRECT_RETURN' | 'SELLER_COLLECT';
  claimedProductOptions: { orderProductOptionNo: number; productCnt: number }[];
  responsibleObjectType?: string;
}

export interface ClaimBody extends Omit<ClaimPriceBody, 'productCnt'> {
  claimReasonDetail: string;
  bankAccountInfo?: {
    bankAccount: string;
    bankDepositorName: string;
    bank: string;
    bankName: string;
  };
  saveBankAccountInfo?: boolean;
  refundsImmediately: boolean;
}

export interface RefundBody extends Omit<ClaimBody, 'refundsImmediately'> {
  returnAddress?: Address;
  deliveryCompanyType?: string;
  invoiceNo?: string;
}

export interface ExchangeBody extends Omit<RefundBody, 'claimType' | 'claimedProductOptions'> {
  productCnt: number;
  exchangeOption: {
    additionalProductNo: number;
    inputTexts?: {
      inputLabel: string;
      inputValue: string;
    }[];
    optionNo: number;
    orderCnt: number;
    productNo: number;
  };
  exchangeAddress: Address;
  additionalPayType?: 'CASH';
  additionalPayBankAccount?: {
    depositorName: string;
    bank: ArrayElement<typeof bankList>['value'];
    bankName: string;
    account: string;
  };
  additionalPayRemitter?: string;
}

export interface ClaimPrice {
  productAmtInfo: {
    standardPrice: number;
    immediateDiscountAmt: number;
    additionalDiscountAmt: number;
    productCouponDiscountAmt: number;
    exchangeAdjustAmt: number;
    freeGiftDiscountAmt: number;
    exchangeImmediateDiscountedPrice: number;
    exchangeDiscountAmt: number;
    immediateDiscountedPrice: number;
    totalAmt: number;
    discountAmt: number;
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
    beforeRemoteDeliveryAmt: number;
    afterRemoteDeliveryAmt: number;
    totalAmt: number;
  };
  subtractionAmtInfo: {
    cartCouponAmt: number;
    deliveryCouponAmt: number;
    refundAdjustAmt: number;
    refundAdjustReason: number;
    totalAmt: number;
  };
  refundPayAmt: number;
  refundSubPayAmt: number;
  refundType: PgTypes;
  refundPayType: RefundPayType;
  refundTypeLabel: string;
  additionalPayAmt: number;
  refundMainPayAmt: number;
}

export interface PopupDetail {
  popupSlideInfo: {
    slideImages: {
      mainImageUrl: string;
      thumbImageUrl: string;
      landingUrl?: string;
    }[];
  };
}
