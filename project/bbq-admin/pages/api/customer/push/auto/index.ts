import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

import { parseForm } from '@/app/lib/parseForm';

import { Content } from '..';

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
      const result = await axios.get<Content>(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/messaging/app-push/${req.query.id}`,
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
        return error.response.data.message;
      } else {
        return error;
      }
    }
  } else if (req.method === 'PATCH') {
    try {
      const { fields } = await parseForm(req);
      const pushSend = JSON.parse(fields.pushSend?.[0] ?? '');
      delete pushSend.pushSend;
      const result = await axios.patch(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API_URL}/admin/messaging/app-push/${pushSend.batchType}`,
        pushSend,
        {
          headers: {
            'Content-Type': 'application/json',
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
