import { type NextRequest, NextResponse } from 'next/server';

import { VERSION1 } from '@/constant/axiosRelated';
import { API_HOST } from '@/libs/customAxios';
import { Product } from '@/types/categorymenu';
import { DisplaySection } from '@/types/mainProduct';

export async function GET(request: NextRequest) {
  const headers = {
    platform: request.nextUrl.searchParams.get('platform') ?? 'PC',
    version: VERSION1,
    clientId: process.env.NEXT_PUBLIC_SHOPBY_CLIENT_ID,
  };
  const res = await fetch(API_HOST + '/display/sections', {
    method: 'GET',
    headers,
  });
  const sections = (await res.json()) as { sections: { sectionId: string }[] };
  const sectionId = sections.sections.map((item: { sectionId: string }) => item.sectionId);

  const productCardGetData = await Promise.all(
    sectionId
      .filter(v => !v.includes('SCPC'))
      .map(async v => {
        const _res = await fetch(API_HOST + `/display/sections/ids/${v}`, {
          method: 'GET',
          headers,
        });
        const data = (await _res.json()) as DisplaySection;

        return data;
      }),
  );

  const productsectionsGetData = await Promise.all(
    sectionId
      .filter(v => v.includes('SCPC'))
      .map(async v => {
        const _res = await fetch(API_HOST + `/display/sections/ids/${v}`, {
          method: 'GET',
          headers,
        });
        const data = (await _res.json()) as DisplaySection;

        return {
          sectionId: data.sectionId,
          sectionExplain: data.sectionExplain,
          label: data.label,
          items: data.products as Product[],
        };
      }),
  );

  const data = {
    productCardGetData,
    productsectionsGetData,
  };

  return NextResponse.json(data);
}
