import { CartItem } from '../CartItem';

export type GetCartAPIParams = {
  branchId: string;
  mealType: string;
  latitude: number;
  longitude: number;
  legalDongId: string;
  administrativeDongId: string;
  ecouponList: string[];
};

export type GetCartAPIResponse = {
  totalPrice: number;
  ecouponDiscountPrice: number;
  discountPrice: number;
  deliveryFee: number;
  responseList: CartItem[];
  familyInfoResponse: {
    changeable: boolean;
    branchId: string;
    address: string;
    branchName: string;
    isAddPrice: boolean;
  };
};
