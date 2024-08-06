export interface Menu {
  id: number;
  menuName: string;
  description: string;
  menuImageUrl: string;
  menuType: string;
  menuPrice: number;
  addPrice?: number;
  nutrient: {
    calorie?: number;
    sugars?: number;
    protein?: number;
    saturatedFat?: number;
    natrium?: number;
  };
  allergy: string;
  origin: {
    name: string;
    region?: string;
  }[];
  canDeliver: boolean;
  canTakeout: boolean;
  isAdultOnly: boolean;
  isSoldOut: boolean;
}
