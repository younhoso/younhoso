import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';
import FormData from 'form-data';
import fs from 'fs';

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
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/messaging/app-push/member-count`,
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
        return res.status(error?.response.status).send(error.response.data);
      } else {
        console.error(error);
      }
    }
  } else if (req.method === 'POST') {
    try {
      const { fields, files } = await parseForm(req);

      const appPushBodyDto =
        fields.appPushBodyDto && fields.appPushBodyDto.length > 0
          ? JSON.parse(fields.appPushBodyDto[0])
          : null;

      const formData = new FormData();

      // 데이타 추가
      formData.append('appPushBodyDto', JSON.stringify(appPushBodyDto), {
        contentType: 'application/json',
      });

      // 파일이 존재하는 경우에만 엑셀 파일 추가
      if (files && files.excelFile && files.excelFile.length > 0) {
        formData.append('excelFile', fs.createReadStream(files.excelFile[0].filepath));
      }

      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/messaging/app-push/manual`,
        formData,
        {
          headers: {
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
        console.error(error);
      }
    }
  }
}
