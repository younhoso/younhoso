export type Event = {
  eventNo: number;
  label: string;
  url: string;
  id: string;
  urlType: string;
  displayPeriodType: string;
  startYmdt: string;
  endYmdt: string;
  pcImageUrl: string;
  mobileimageUrl: string;
  promotionText: string;
  tag: string;
  eventYn: string;
  progressStatus: string;
};

export type Product = {
  productNo: number;
  productName: string;
  productNameEn: string;
  promotionText: string;
  salePrice: number;
  immediateDiscountAmt: number;
  immediateDiscountUnitType: string;
  additionDiscountAmt: number;
  additionDiscountUnitType: string;
  minSalePrice: number;
  maxSalePrice: number;
  maxDiscountAmount: number;
  liked: boolean;
  likeCount: number;
  partnerName: string;
  reviewRating: number;
  totalReviewCount: number;
  deliveryConditionType: string;
  saleCnt: number;
  stockCnt: number;
  mainStockCnt: number;
  brandNo: number;
  brandName: string;
  brandNameEn: string;
  stickerInfos: Record<string, unknown>;
  stickerLabels: Record<string, unknown>;
  adult: boolean;
  salePeriodType: string;
  saleStartYmdt: string;
  saleEndYmdt: string;
  saleStatusType: string;
  imageUrls: string[];
  listImageUrls: string[];
  hasCoupons: Record<string, boolean>;
  couponTag: string;
  maxCouponAmt: number;
  couponDiscountAmt: number;
  registerYmdt: string;
  contentsIfPausing: string;
  optionValues: Record<string, unknown>;
  displayCategoryNos: string;
  searchProductId: string;
  frontDisplayYn: boolean;
  urlDirectDisplayYn: boolean;
  productManagementCd: string;
  hsCode: string;
  isSoldOut: boolean;
  accumulationInfo: {
    amount: number;
    rewardRateOfProduct: number;
    rewardRateOfMemberBenefit: number;
  };
  canAddToCart: boolean;
  enableCoupons: boolean;
};

export type Section = {
  label: string;
  imageUrl: string;
  pcPerRow: number;
  mobilePerRow: number;
  displayOrder: number;
  displayableStock: boolean;
  products: Product[];
  productNos: number[];
};

export type EventDetail = {
  eventNo: number;
  label: string;
  urlType: string;
  url: string;
  displayPeriodType: string;
  startYmdt: string;
  endYmdt: string;
  pcImageUrl: string;
  mobileimageUrl: string;
  tag: string;
  categoryNos: Record<string, unknown>;
  section: Section[];
  coupon: Record<string, unknown>;
  top: {
    pc: {
      url: string;
      type: string;
    };
    mobile: {
      url: string;
      type: string;
    };
  };
  orders: string[];
  promotionText: string;
  eventYn: string;
};
