import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';
import FormData from 'form-data';
import fs from 'fs';

import { parseForm } from '@/app/lib/parseForm';

import { SubOptionItemsEntity } from './option';
import { MenuRegisterResponse } from './register';

export const config = {
  api: {
    bodyParser: false,
  },
};

export type MenuType = 'MAIN' | 'SIDE' | 'ALCOHOL';

export interface MenuResponse {
  id: number;
  menuName: string;
  description: string;
  menuImageUrl: string;
  menuType: MenuType;
  menuPrice: number;
  alcoholPrice: number;
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
  isEcouponOnlyMenu: boolean;
  categoryIds?: null;
  categories?: CategoriesEntity[] | null;
  options?: OptionsEntity[] | null;
  requiredOptions: OptionResponse[] | null;
  optionalOptions: OptionResponse[] | null;
}

interface OptionResponse {
  priority?: number;
  id?: number;
  subOptionTitle: string;
  requiredSelectCount: string;
  maxSelectCount: string;
  subOptionItems: SubOptionItemsEntity[] | [];
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
      const result = await axios.get<MenuResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/menu/${req.query.id}`,
        {
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
  } else if (req.method === 'DELETE') {
    try {
      const result = await axios.delete<MenuResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/menu/${req.query.id}`,
        {
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
  } else if (req.method === 'PATCH') {
    try {
      const { fields, files } = await parseForm(req);
      const menuInfo = JSON.parse(fields.menuInfo?.[0] ?? '');

      const formData = new FormData();
      formData.append('menuInfo', JSON.stringify(menuInfo), {
        contentType: 'application/json',
      });

      if (files.imageFile) {
        formData.append('imageFile', fs.createReadStream(files.imageFile[0].filepath));
      }

      const result = await axios.patch<MenuRegisterResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/menu/${req.query.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=' + formData.getBoundary(),
            Authorization: `Bearer ${token?.authenticationResponse?.accessToken}`,
          },
        },
      );

      if (result.status == 200) {
        return res.status(200).send(result.data);
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return res.status(error?.response.status).send(error.response.data);
      } else {
        return error;
      }
    }
  }
}
