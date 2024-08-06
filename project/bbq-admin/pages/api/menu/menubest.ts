import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface MenuBestResponse {
  menuBests?: MenuBest[] | [];
}
export interface MenuBest {
  menuId: number;
  menuName: string;
  menuImageUrl: string;
  totalOrderCount: number;
  totalOrderPrice: number;
  totalMenuSaleCount: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });

  if (token?.authenticationResponse?.accessToken == undefined)
    return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    try {
      const result = await axios.get<MenuBestResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/menu/dashboard/menu-best`,
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
  }
}
