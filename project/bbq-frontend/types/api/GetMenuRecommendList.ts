export type GetMenuRecommendListAPIParams = {
  type: 'recommended' | 'new' | 'cart';
};

export type GetMenuRecommendListAPIResponse = {
  categoryKey: string;
  categoryName: string;
  menuItemList: {
    menuId: number;
    menuName: string;
    menuDescription: string;
    menuPrice: number;
    menuImageUrl: string;
    priority: number;
  }[];
}[];
