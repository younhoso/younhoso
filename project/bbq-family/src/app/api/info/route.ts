import { getSession } from 'next-auth/react';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import axios, { isAxiosError } from 'axios';

export type MallInfoResponse = {
  familyName: string;
  isOpen: boolean;
  openSchedule: {
    weekdayOpenAt: string;
    weekdayCloseAt: string;
    weekendOpenAt: string;
    weekendCloseAt: string;
  };
  closeScheduleList: [
    {
      weekType: string;
      dayOfWeek: string;
    },
  ];
  tempCloseSchedule: {
    startDate: string;
    endDate: string;
  };
  familyImageUrl: string;
  address: string;
  tel: string;
} | null;

export type openStatus = 'OPEN' | 'CLOSE';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      // secureCookie: process.env.NODE_ENV == 'production' ? true : false,
    });

    if (token?.accessToken == undefined)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const result = await axios.get<MallInfoResponse>(
      `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/family-admin/info`,
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
      `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/family-admin/info/open-status`,
      {},
      {
        params: {
          openType: body.openType,
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

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      // secureCookie: process.env.NODE_ENV == 'production' ? true : false,
    });

    if (token?.accessToken == undefined)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    await axios.patch(
      `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/family-admin/info/close-schedule`,
      {
        closeScheduleInfoList: body.closeScheduleInfoList,
      },
      {
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      },
    );
    await axios.patch(
      `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/family-admin/info/open-schedule`,
      {
        weekdayOpenAt: body.openSchedule.weekdayOpenAt,
        weekdayCloseAt: body.openSchedule.weekdayCloseAt,
        weekendOpenAt: body.openSchedule.weekendOpenAt,
        weekendCloseAt: body.openSchedule.weekendCloseAt,
      },
      {
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      },
    );
    await axios.patch(
      `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/family-admin/info/temp-close-schedule`,
      {
        startDate: body.tempCloseSchedule.startDate,
        endDate: body.tempCloseSchedule.endDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      },
    );
    return NextResponse.json({ status: 200 });
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
