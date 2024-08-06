import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';
import FormData from 'form-data';
import fs, { PathLike } from 'fs';

import { parseForm } from '@/app/lib/parseForm';
import { ApiResponse } from '.';

export const config = {
  api: {
    bodyParser: false,
  },
};

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
      const bannerInfo = JSON.parse(fields.bannerInfo ? fields.bannerInfo[0] : '{}');

      const formData = new FormData();
      formData.append('bannerInfo', JSON.stringify(bannerInfo), {
        contentType: 'application/json',
      });

      if (Object.keys(files).length !== 0)
        formData.append(
          'imageFileApp',
          fs.createReadStream(files.imageFileApp?.[0].filepath as PathLike),
        );

      formData.append(
        'imageFileWeb',
        fs.createReadStream(files.imageFileWeb?.[0].filepath as PathLike),
      );

      const result = await axios.post<ApiResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/content/banner`,
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
        return error.response.data.message;
      } else {
        return error;
      }
    }
  } else if (req.method === 'PATCH') {
    try {
      const { fields, files } = await parseForm(req);
      const bannerInfo = JSON.parse(fields.bannerInfo ? fields.bannerInfo[0] : '{}');
      const formData = new FormData();
      formData.append('bannerInfo', JSON.stringify(bannerInfo), {
        contentType: 'application/json',
      });

      if (files.imageFileApp && files.imageFileApp[0] && files.imageFileApp[0].filepath) {
        formData.append(
          'imageFileApp',
          fs.createReadStream(files.imageFileApp?.[0].filepath as PathLike),
        );
      }

      if (files.imageFileWeb && files.imageFileWeb[0] && files.imageFileWeb[0].filepath) {
        formData.append(
          'imageFileWeb',
          fs.createReadStream(files.imageFileWeb?.[0].filepath as PathLike),
        );
      }

      const result = await axios.patch<ApiResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/content/banner/${req.query.id}`,
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
      console.error('error', error);
      if (isAxiosError(error) && error.response) {
        return res.status(error?.response.status).send(error.response.data);
      } else {
        return error;
      }
    }
  }
}
