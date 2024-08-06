import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';
import FormData from 'form-data';
import formidable from 'formidable';
import fs, { PathLike } from 'fs';

import { parseForm } from '@/app/lib/parseForm';

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface MenuRegisterResponse {
  id: number;
  menuName: string;
  description: string;
  menuImageUrl: string;
  menuType: string;
  menuPrice: number;
  nutrient: Nutrient;
  allergy: string;
  origin?: OriginEntity[] | null;
  categoryIds?: number[] | null;
  options?: OptionsEntity[] | null;
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

export interface OptionsEntity {
  id?: number | null;
  priority: number;
  isActive: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    // secureCookie: process.env.NODE_ENV == 'production' ? true : false
  });

  if (token?.authenticationResponse?.accessToken == undefined)
    return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'POST') {
    try {
      const { fields, files } = await parseForm(req);
      const menuInfo = JSON.parse(fields.menuInfo?.[0] ?? '');

      const formData = new FormData();
      formData.append('menuInfo', JSON.stringify(menuInfo), {
        contentType: 'application/json',
      });

      formData.append('imageFile', fs.createReadStream(files.imageFile?.[0].filepath as PathLike));

      const result = await axios.post<MenuRegisterResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/menu`,
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
