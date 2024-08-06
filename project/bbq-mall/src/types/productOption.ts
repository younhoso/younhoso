export type Option = {
  key: string;
  label: string;
  value: string;
  optionNo: number;
  addPrice: number;
  saleCnt: number;
  stockCnt: number;
  reservationStockCnt: number;
  saleType: string;
  main: boolean;
  images: any[];
  optionManagementCd: string;
  buyPrice: number;
  forcedSoldOut: boolean;
  children: any[];
  rentalInfo: any[];
};

export type Product = {
  type: string;
  selectType: string;
  labels: string[];
  multiLevelOptions: Option[];
  flatOptions: Option[];
  inputs: any[];
  displayableStock: boolean;
  productSalePrice: number;
  immediateDiscountAmt: number;
  additionalProducts: any[];
};

export type Selected = {
  key: string;
  value: string;
  productNo: number;
  optionNo: number;
  orderCnt: number;
  buyPrice: number;
};

export type CombinedProductOption = Product & Option;
