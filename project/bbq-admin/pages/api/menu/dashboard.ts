import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface MenuDashboardResponse {
  menuDashboardDetailInfo: MenuDashboardDetailInfo;
  menuDashboardSalesInfos?: MenuDashboardSalesInfosEntity[] | [];
  menuDashboardBestInfos?: MenuDashboardBestInfosEntity[] | [];
}
export interface MenuDashboardDetailInfo {
  totalMenuCount: number;
  topSalesMenuName: string;
}
export interface MenuDashboardSalesInfosEntity {
  menuName: string;
  menuSaleCount: number;
  totalMenuSaleCount: number;
}
export interface MenuDashboardBestInfosEntity {
  menuId: number;
  menuName: string;
  menuImageUrl: string;
  totalOrderCount: number;
  totalOrderPrice: number;
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
      const result = await axios.get<MenuDashboardResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/menu/dashboard/${req.query.priorDays}/${req.query.limit}`,
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
