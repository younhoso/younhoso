import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';
import FormData from 'form-data';
import fs, { PathLike } from 'fs';

import { parseForm } from '@/app/lib/parseForm';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });

  if (token?.authenticationResponse?.accessToken == undefined)
    return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/content/client-config/APP`,
        {
          headers: {
            Authorization: `Bearer ${token?.authenticationResponse?.accessToken}`,
          },
        },
      );

      if (result.status === 200) {
        return res.status(200).send(result.data);
      } else {
        return null;
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
      const configInfo = JSON.parse(
        fields.clientConfigUpdateRequest ? fields.clientConfigUpdateRequest[0] : '{}',
      );

      const formData = new FormData();
      formData.append('clientConfigUpdateRequest', JSON.stringify(configInfo), {
        contentType: 'application/json',
      });

      if (Object.keys(files).length !== 0)
        formData.append(
          'splashImageFile',
          fs.createReadStream(files.splashImageFile?.[0].filepath as PathLike),
        );

      const result = await axios.patch(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/content/client-config/APP`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=' + formData.getBoundary(),
            Authorization: `Bearer ${token?.authenticationResponse?.accessToken}`,
          },
        },
      );

      if (result.status === 200) {
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
