import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

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
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/menu/download-excel`,
        {
          responseType: 'arraybuffer',
          params: {
            searchName: req.query.searchName,
            menuType: req.query.menuType,
            isActive: req.query.isActive,
            isDisplay: req.query.isDisplay,
            categoryIds: req.query.categoryIds,
            isEcouponOnlyMenu: req.query.isEcouponOnlyMenu,
            menuGroup: req.query.menuGroup,
          },
          headers: {
            Authorization: `Bearer ${token?.authenticationResponse?.accessToken}`,
          },
        },
      );

      if (result.status == 200) {
        return res
          .status(200)
          .setHeader(
            'content-type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          )
          .setHeader('Content-Disposition', result.headers['content-disposition'])
          .send(result.data);
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
  }
}
