import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';

export interface OptionResponse {
  id?: number;
  subOptionTitle: string;
  requiredSelectCount: string;
  maxSelectCount: string;
  subOptionItems: SubOptionItemsEntity[] | [];
}
export interface SubOptionItemsEntity {
  id?: number;
  itemTitle: string;
  addPrice: string;
  priority: string;
  isActive: boolean;
  posCodeFoodTech: string;
  posCodeSolbi: string;
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
      const result = await axios.get<OptionResponse[]>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/menu/option`,
        {
          params: {
            searchName: req.query.searchName,
          },
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
      const result = await axios.post<OptionResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/menu/option`,
        req.body,
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
  } else if (req.method === 'PATCH') {
    const result = await axios.patch<OptionResponse>(
      `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/menu/option/${req.body.id}`,
      req.body,
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
  } else if (req.method === 'DELETE') {
    try {
      const result = await axios.patch<OptionResponse>(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/admin/menu/option/${req.query.id}`,
        req.query,
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
