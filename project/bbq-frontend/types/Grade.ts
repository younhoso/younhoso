export interface Grade {
  id: number;
  name: string;
  rangeMinPrice: number;
  rangeMaxPrice: number;
  iconUrl?: string;
  pointEarnRate: number;
  couponList: string[];
}
