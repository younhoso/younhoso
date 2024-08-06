import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

import axios, { AxiosError, isAxiosError } from 'axios';
import FormData from 'form-data';
import formidable from 'formidable';
import fs, { PathLike } from 'fs';

import { IFileTypes } from '@/app/components/FileInput';
import { parseForm } from '@/app/lib/parseForm';

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface MenuCategoryResponse {
  id: number;
  categoryName: string;
  categoryImageUrl: string;
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

  if (req.method === 'GET') {
    try {
      const result = await axios.get<MenuCategoryResponse[]>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/menu/category`,
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
  } else if (req.method === 'POST') {
    try {
      const { fields, files } = await parseForm(req);
      const categoryInfo = JSON.parse(fields.categoryInfo?.[0] ?? '');

      const formData = new FormData();
      formData.append(
        'categoryInfo',
        JSON.stringify({
          categoryName: categoryInfo.categoryName,
          priority: parseInt(categoryInfo.priority),
          isActive: categoryInfo.isActive,
        }),
        {
          contentType: 'application/json',
        },
      );

      formData.append('imageFile', fs.createReadStream(files.imageFile?.[0].filepath as PathLike));

      const result = await axios.post<MenuCategoryResponse[]>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/menu/category`,
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
      }
    }
  } else if (req.method === 'PATCH') {
    try {
      const { fields, files } = await parseForm(req);
      const categoryInfo = JSON.parse(fields.categoryInfo?.[0] ?? '');

      const formData = new FormData();
      formData.append(
        'categoryInfo',
        JSON.stringify({
          categoryName: categoryInfo.categoryName,
          priority: parseInt(categoryInfo.priority),
          isActive: categoryInfo.isActive,
        }),
        {
          contentType: 'application/json',
        },
      );
      if (files.imageFile != undefined) {
        formData.append('imageFile', fs.createReadStream(files.imageFile[0].filepath));
      }

      const result = await axios.patch<MenuCategoryResponse[]>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/menu/category/${categoryInfo.id}`,
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
      console.error(error);
    }
  }
}
