import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

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

  if (req.method === 'PATCH') {
    try {
      const { fields } = await parseForm(req);
      const eCoupon = JSON.parse(fields.eCouponInfo?.[0] ?? '');
      const result = await axios.patch(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/menu/ecoupon/${req.query.id}`,
        eCoupon,
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
