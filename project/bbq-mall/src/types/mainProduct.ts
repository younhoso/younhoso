import { Product } from './categorymenu';

export interface DisplayConfig {
  displayHeight: number;
  displayWidth: number;
  displayType: string;
}

export interface BasicSection {
  sectionId: string;
  sectionExplain: string;
  label: string;
  items: Product[];
}

export interface AdditionalSection {
  categoryNo?: number;
  sectionNo?: number;
  promotionText?: string;
  imageUrl?: string;
  leftSpaceColor?: string;
  rightSpaceColor?: string;
  productTotalCount?: number;
  displayConfig?: DisplayConfig;
  products?: any[];
  recommendedProducts?: any[];
  displayableStock?: boolean;
}

export type DisplaySection = BasicSection & AdditionalSection;

interface Register {
  no: number;
  name: string;
}

interface ProductInfo {
  no: number;
  name: string;
  thumbnailImage: string;
  totalReviewCount: number;
}

interface Input {
  inputLabel: string;
  inputValue: string;
}

interface OrderedOption {
  orderOptionNo: number;
  optionName: string;
  optionValue: string;
  addPrice: number;
  optionUsed: boolean;
  orderCnt: number;
  optionTitle: string;
  optionType: string;
  orderStatusType: string;
  inputs: Input[];
}

export interface Item {
  reviewNo: number;
  rate: number;
  productNo: number;
  productName: string;
  providerType: string;
  memberId: string;
  registerName: string;
  registerNo: number;
  registerYmdt: string;
  updateYmdt: string;
  recommendCnt: number;
  reportCnt: number;
  blindReportCnt: number;
  recommendable: boolean;
  reportable: boolean;
  myReview: boolean;
  platformType: string;
  extraJson: string;
  bestReviewYn: string;
  isDeletedProductReview: boolean;
  commentCount: number;
  imageUrl: string;
  content: string;
  brandName: string;
  memberName: string;
  nickname: string;
  brandNameEn: string;
  orderedOption: OrderedOption;
  fileUrls: string[];
  productTotalCount: number;
  productRate: number;
  productDiscountPrice: number;
  expelled: boolean;
  givenAccumulationYn: string;
  externalReview: boolean;
}

export interface ReviewData {
  totalCount: number;
  rate: number;
  items: Item[];
  reviewRatingResponses: unknown[];
}

export interface ReviewItem {
  rate: number;
  reviewNo: number;
  content: string;
  images: string[];
  fileUrls: string[];
  register: Register;
  productInfo: ProductInfo;
  isBestReview: boolean;
  registerName: string;
  registerYmdt: string;
}
