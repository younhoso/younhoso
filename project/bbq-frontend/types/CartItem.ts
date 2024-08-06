export interface CartItem {
  id: number;
  menuType: string; // ex. MAIN
  mainMenuId: number;
  mainMenuName: string;
  menuImageUrl: string;
  quantity: number;
  price: number;
  totalMenuWithSubOptionPrice: number;
  totalMenuWithSubOptionAndQuantityPrice: number;
  isOnlyOrderWithEcoupon: boolean;
  isAdultOnly: boolean;
  isHidden: boolean;
  isSoldOut: boolean;
  solbiPosCode?: string;
  foodtechPosCode?: string;
  subOptionHeadList: {
    subOptionId: number;
    subOptionName: string;
    subOptionDetailList: {
      subOptionDetailId: number;
      subOptionDetailName: string;
      price: number;
      isSoldOut: boolean;
      solbiPosCode?: string;
      foodtechPosCode?: string;
    }[];
  }[];
}
