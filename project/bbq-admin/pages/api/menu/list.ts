import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export type MenuType = 'MAIN' | 'SIDE' | 'ALCOHOL';

export interface MenuListResponse {
  content: ContentEntity[] | null;
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort?: string | null[] | null;
  number: number;
  first: boolean;
  size: number;
  numberOfElements: number;
  empty: boolean;
}

export interface ContentEntity {
  id: number;
  menuName: string;
  description: string;
  menuImageUrl: string;
  menuType: MenuType;
  menuPrice: number;
  addPrice: number;
  posCodeFoodTech: string;
  posCodeSolbi: string;
  nutrient: Nutrient;
  allergy: string;
  origin?: OriginEntity[] | null;
  canDeliver: boolean;
  canTakeout: boolean;
  isAdultOnly: boolean;
  isDisplay: boolean;
  isActive: boolean;
  categoryIds?: null;
  categories?: CategoriesEntity[] | null;
  options?: OptionsEntity[] | null;
  isEcouponOnlyMenu: boolean;
}
export interface TableRollCellProps extends ContentEntity {
  showPriority: boolean;
  thisCategory: CategoriesEntity | undefined;
  updatePriority: (categoryId: number, priority: number, menuId: number) => void;
  menuGroup: string[];
}

export interface Nutrient {
  calorie: number;
  sugars: number;
  protein: number;
  saturatedFat: number;
  natrium: number;
}

export interface OriginEntity {
  name: string;
  region: string;
}

export interface CategoriesEntity {
  id: number;
  categoryName: string;
  categoryImageUrl?: string | null;
  isActive: boolean;
  priority: number;
}

export interface OptionsEntity {
  id: number;
  priority: number;
  isActive: boolean;
}
export interface Pageable {
  sort?: string | null[] | null;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    // secureCookie: process.env.NODE_ENV == 'production' ? true : false
  });

  if (token?.authenticationResponse?.accessToken == undefined)
    return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    try {
      const result = await axios.get<MenuListResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/menu`,
        {
          params: {
            page: req.query.page,
            size: req.query.size,
            searchName: req.query.searchName,
            menuType: req.query.menuType,
            categoryIds: req.query.categoryIds,
            isEcouponOnlyMenu: req.query.isEcouponOnlyMenu,
            menuGroup: req.query.menuGroup,
            isActive: req.query.isActive,
            isDisplay: req.query.isDisplay,
          },
          headers: {
            Authorization: `Bearer ${token?.authenticationResponse?.accessToken}`,
          },
        },
      );

      if (result.status == 200) {
        return res.status(200).send(result.data);
      } else {
        return null;
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return res.status(error.response.status).send(error.response.data);
      } else {
        return res.status(500).send(error);
      }
    }
  }
}
