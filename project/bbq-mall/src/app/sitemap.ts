import { MetadataRoute } from 'next';

import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { InquiryCategory, SimpleCategory } from '@/types';

export const specialPages: { [key: string]: string } = {
  '이벤트/혜택': '/event/ing',
};

const url = process.env.NEXT_PUBLIC_KCP_CONFIRM_URL + '/pc';

const defaultSiteMaps: MetadataRoute.Sitemap = [
  //메인
  {
    url,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  },
  //당첨자 발표
  {
    url: url + '/event/winners',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  //로그인
  {
    url: url + '/sign/in',
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.5,
  },
  //주문조회
  {
    url: url + '/order/check/guest',
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.2,
  },
  // 1:1문의
  {
    url: url + '/inquiry',
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.4,
  },
];

// 고객센터
const getBoardList = async (): Promise<MetadataRoute.Sitemap> => {
  const { data } = await customAxios(PLATFORMLIST.PC).get<InquiryCategory>(
    '/boards/configurations',
  );

  return data.boardConfigs
    .filter(v => v.name !== '당첨자 발표')
    .map(v => ({
      url: url + '/help/' + v.boardNo,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.3,
    }));
};

// 카테고리 모음
const getCategories = async (): Promise<MetadataRoute.Sitemap> => {
  const { data } = await customAxios(PLATFORMLIST.PC).get<SimpleCategory[]>(
    '/categories/simple-1depth',
  );

  return data.map(v => ({
    url:
      url + specialPages[v.displayCategoryName] ??
      `/categories/${v.displayCategoryNo}${v.displayCategoryName === '전체상품' ? '?all=true' : '/promote'}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const boardList = await getBoardList();
  const categories = await getCategories();

  return [...defaultSiteMaps, ...boardList, ...categories];
}
