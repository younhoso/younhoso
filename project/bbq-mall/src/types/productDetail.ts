export type BaseInfo = {
  productNo: number;
  saleStartYmdt: string;
  saleEndYmdt: string;
  salePeriodType: string;
  registerYmdt: string;
  promotionText: string;
  productName: string;
  productNameEn: string;
  imageUrls: string[];
  placeOriginLabel: string;
  placeOriginEtcLabel: string;
  manufactureYmdt: string;
  expirationYmdt: string;
  contentHeader: string;
  content: string;
  contentFooter: string;
  dutyInfo: string;
  stickerLabels: string[];
  stickerInfos: {
    type: string;
    label: string;
    name: string;
  }[];
  optionImageViewable: boolean;
  productManagementCd: string;
  purchaseGuide: string;
  accumulationUseYn: string;
  deliveryCustomerInfo: string;
  certificationType: string;
  certifications: {
    no: number;
    type: string;
    organization: string;
    code: string;
    target: string;
    date: string;
  }[];
  productGroup: string;
  hsCode: string;
  usableRestockNoti: boolean;
  productType: string;
  customPropertise: {
    propNo: number;
    propValueNo: number;
    propName: string;
    propValue: string;
    multipleSelectionYn: string;
  }[];
  couponUseYn: string;
  minorPurchaseYn: string;
  imageUrlInfo: {
    url: string;
    type: string;
  }[];
};

export type DeliveryDate = {
  daysAfterPurchase: null;
  daysOfWeek: null;
  period: null;
};

export type Stock = {
  saleCnt: number;
  stockCnt: number;
  mainStockCnt: number;
};

export type Price = {
  salePrice: number;
  immediateDiscountAmt: number;
  immediateDiscountUnitType: string;
  immediateDiscountStartYmdt: string;
  immediateDiscountEndYmdt: string;
  additionDiscountAmt: number;
  additionDiscountUnitType: string;
  additionDiscountValue: number;
  minSalePrice: number;
  maxSalePrice: number;
  maxAdditionDiscountAmt: number;
  maxDiscountAmount: number;
  unitName: string;
  unitNameType: string;
  unitPrice: number;
  maxCouponAmt: number;
  couponDiscountAmt: number;
  accumulationAmtWhenBuyConfirm: number;
  accumulationRate: number;
  accumulationRateOfMember: number;
  photoReviewAccumulationAmt: number;
  contentsIfPausing: string;
};

export type DeliveryFee = {
  deliveryConditionType: string;
  deliveryAmt: number;
  aboveDeliveryAmt: null;
  returnDeliveryAmt: number;
  deliveryType: string;
  deliveryCompanyType: string;
  perOrderCnt: null;
  defaultDeliveryConditionLabel: string;
  deliveryAmtLabels: string[];
  deliveryCompanyTypeLabel: string;
  deliveryConditionDetails: any[];
  remoteDeliveryAreaFees: any[];
  deliveryPrePayment: boolean;
  returnWarehouse: {
    warehouseNo: number;
    warehouseName: string;
    defaultReleaseWarehouseYn: string;
    defaultReturnWarehouseYn: string;
    partnerNo: number;
    address: string;
    detailAddress: string;
    zipCd: string;
    overseaAddress1: string;
    overseaAddress2: string;
    overseaCity: string;
    overseaRegion: string;
    countryCd: string;
    warehouseAddressType: string;
    deleteYn: string;
    registerAdminNo: number;
    updateYmdt: string;
    updateAdminNo: number;
    addressStr: string;
  };
  deliveryCustomerInfo: string;
};

export type Limitations = {
  minBuyCnt: number;
  maxBuyPersonCnt: number;
  maxBuyTimeCnt: number;
  maxBuyDays: number;
  maxBuyPeriodCnt: number;
  memberOnly: boolean;
  canAddToCart: boolean;
  refundable: boolean;
  naverPayHandling: boolean;
};

export type Counter = {
  likeCnt: number;
  reviewCnt: number;
  inquiryCnt: number;
  myInquiryCnt: number;
};

export type Category = {
  fullCategoryLabel: string;
  categories: {
    label: string;
    depth: number;
    categoryNo: number;
  }[];
};

export type Partner = {
  partnerName: string;
  businessRegistrationNo: string;
  companyName: string;
  onlineMarketingBusinessDeclarationNo: string;
  ownerName: string;
  officeAddressLabel: string;
  phoneNo: string;
  faxNo: string;
  email: string;
};

export type Status = {
  saleStatusType: string;
  soldout: boolean;
  display: boolean;
  productClassType: string;
};

export type PartnerNotice = {
  title: string;
  content: string;
};

export type ReservationData = {
  reservationStartYmdt: string;
  reservationEndYmdt: string;
  reservationDeliveryYmdt: string;
  reservationStockCnt: number;
};

export type ShippingInfo = {
  shippingAvailable: boolean;
  shippingConfig: {
    shippingAreaType: string;
    shippingAreaPartnerNo: number;
    combinable: boolean;
    internationalShippingAvailable: boolean;
    templateNo: number;
  };
};

export type RegularDelivery = {
  discount: {
    type: string;
    value: number;
  };
};

export type RentalInfo = {
  rentalPeriod: number;
  monthlyRentalAmount: number;
  creditRating: number;
};

export type ProductType = {
  displayableStock: boolean;
  saleMethodType: string;
  reviewAvailable: boolean;
  reviewRate: number;
  mainBestProductYn: boolean;
};

export type Brand = {
  brandNo: number;
  name: string;
  nameEn: string;
  nameKo: string;
  nameType: string;
};

export type Product = {
  baseInfo: BaseInfo;
  deliveryDate: DeliveryDate;
  stock: Stock;
  price: Price;
  deliveryFee: DeliveryFee;
  limitations: Limitations;
  counter: Counter;
  categories: Category[];
  brand: Brand;
  liked: boolean;
  partner: Partner;
  status: Status;
  partnerNotice: PartnerNotice;
  reservationData: ReservationData;
  deliveryGuide: string;
  afterServiceGuide: string;
  refundGuide: string;
  exchangeGuide: string;
  liquorDelegationGuide: string;
  relatedProductNos: number[];
  shippingInfo: ShippingInfo;
  groupManagementCode: string;
  groupManagementCodeName: string;
  regularDelivery: RegularDelivery;
  rentalInfos: RentalInfo[];
  productType: ProductType;
};

export type Answer = {
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
  answerNo: number;
  answerRegisterYmdt: string;
  answerContent: string;
};

export const InquiryStatus = {
  ISSUED: 'ISSUED',
  ANSWERED: 'ANSWERED',
} as const;

export type Item = {
  inquiryStatus: (typeof InquiryStatus)[keyof typeof InquiryStatus];
  inquiryContent: string;
  inquiryTitle: string;
  inquiryNo: number;
  issuerName: number;
  blocked: boolean;
  title: string;
  content: string;
  replied: boolean;
  administrator: boolean;
  secreted: boolean;
  memberId: string;
  registerNo: number;
  registerName: string;
  providerType: string;
  expelled: boolean;
  nickName: string;
  gradeLabel: string;
  registerYmdt: string;
  updateYmdt: string;
  modifiable: boolean;
  myInquiry: boolean;
  type: string;
  productNo: number;
  productName: string;
  productManagementCd: string;
  orderNo: string;
  brandName: string;
  brandNameEn: string;
  imageUrl: string;
  displayStatusType: string;
  answers: Answer[];
};

export type inquiryData = {
  items: Item[];
  totalCount: number;
};

export type ModifyProductQnaBody = {
  title: string;
  content: string;
  secreted: boolean;
  parentInquiryNo?: number;
  productNo: number;
  type: string;
  email?: string;
};

export type OptionValue = {
  value: string;
  buyPrice: number;
  optionNo: number;
  orderCnt: number;
  addPrice: number;
  stockCnt: number;
};

export type OptionRecord = Record<string, OptionValue[]>;

export type CombinedProduct = Product &
  ProductType &
  RentalInfo &
  RegularDelivery &
  ShippingInfo &
  ReservationData &
  PartnerNotice &
  Status &
  Partner &
  Price &
  Counter &
  inquiryData;
