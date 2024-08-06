import { getSession } from 'next-auth/react';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import axios, { isAxiosError } from 'axios';

import { MenuSaleType, MenuType } from '../route';

export type MenuDetailResponseData = {
  endAt: string;
  menuId: number;
  menuName: string;
  menuImage: string;
  isAdultOnly: boolean;
  menuType: MenuType;
  menuPrice: number;
  menuSaleType: MenuSaleType;
  description: string;
  subOptionInfoList: [
    {
      subOptionName: string;
      subOptionItemInfoList: [
        {
          subOptionItemId: number;
          subOptionItemName: string;
          subOptionItemPrice: number;
          subOptionSaleType: MenuSaleType;
          endAt: string;
        },
      ];
    },
  ];
};

export type OptionDetailResponseData = {
  subOptionId: number;
  subOptionName: string;
  relatedMenuInfoList: [
    {
      menuId: number;
      menuName: string;
    },
  ];
  requiredSelectCount: number;
  maxSelectCount: number;
  subOptionItemInfoList: [
    {
      subOptionItemId: number;
      subOptionItemName: string;
      addPrice: number;
      subOptionSaleType: MenuSaleType;
      endAt: string;
    },
  ];
};

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      // secureCookie: process.env.NODE_ENV == 'production' ? true : false,
    });

    if (token?.accessToken == undefined)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (req.url == undefined) return null;
    const url = new URL(req.url).search;
    const searchParams = new URLSearchParams(url);

    if (searchParams.get('menuId')) {
      const result = await axios.get<MenuDetailResponseData>(
        `${
          process.env.NEXT_PUBLIC_DELIVERY_API_URL
        }/family-admin/menu/${searchParams.get('menuId')}`,
        {
          headers: {
            Authorization: `Bearer ${token?.accessToken}`,
          },
        },
      );
      if (result.status == 200) {
        return NextResponse.json(result.data, { status: 200 });
      } else {
        return null;
      }
    } else if (searchParams.get('subOptionItemId')) {
      const result = await axios.get<OptionDetailResponseData>(
        `${
          process.env.NEXT_PUBLIC_DELIVERY_API_URL
        }/family-admin/option/${searchParams.get('subOptionItemId')}`,
        {
          headers: {
            Authorization: `Bearer ${token?.accessToken}`,
          },
        },
      );
      if (result.status == 200) {
        return NextResponse.json(result.data, { status: 200 });
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    } else {
      return NextResponse.json(error, { status: 500 });
    }
  }
}
