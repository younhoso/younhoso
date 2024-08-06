import { getSession } from 'next-auth/react';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import axios, { isAxiosError } from 'axios';

export type MenuSaleType = 'AVAILABLE' | 'SOLD_OUT' | 'HIDDEN';
export type MenuType = 'MAIN' | 'SIDE' | 'ALCOHOL';

export type Pageable = {
  sort: Array<string>;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
};
export type RestData = {
  last: boolean;
  totalPages: number;
  totalElements: number;
  number: number;
  sort: Array<string>;
  first: boolean;
  size: number;
  numberOfElements: number;
  empty: boolean;
};

export type MenuResponseData = {
  content:
    | [
        {
          menuId: number;
          menuName: string;
          menuImage: string;
          isAdultOnly: boolean;
          menuPrice: number;
          menuSaleType: MenuSaleType;
          endAt: string;
        },
      ]
    | [];
  pageable: Pageable;
} & RestData;

export async function GET(req: NextRequest) {
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

    const result = await axios.get<MenuResponseData>(
      `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/family-admin/menu`,
      {
        params: {
          page: searchParams.get('page'),
          searchName: searchParams.get('searchName'),
          menuType: searchParams.get('menuType'),
          menuSaleType: searchParams.get('menuSaleType'),
          size: 9999,
        },
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

export async function PATCH(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      // secureCookie: process.env.NODE_ENV == 'production' ? true : false,
    });

    if (token?.accessToken == undefined)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const result = await axios.patch(
      `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/family-admin/menu/${body.menuId}/sale`,
      {
        menuSaleType: body.menuSaleType,
        endAt: body.endAt,
      },
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
