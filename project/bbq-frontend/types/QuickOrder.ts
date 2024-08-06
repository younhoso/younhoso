export interface QuickOrder {
  id: number;
  branchId: string;
  familyName: string; //"테스트1매장";
  totalPrice: number; //102000;
  quickOrderTitle: string; //"테스트 퀵오더";
  mealType: string; // "DELIVERY" | "TAKEOUT";
  quickOrderDetailList: {
    id: number;
    menuId: number;
    menuPrice: number;
    menuName: string;
    quantity: number;
    menuImageUrl: string;
    quickOrderSubOptionItemDetailList: {
      menuId: number;
      subOptionId: number;
      subOptionName: string;
      subOptionItemId: number;
      subOptionItemName: string;
      addPrice: number;
    }[];
  }[];
}
