'use client';

import { useQuery } from '@tanstack/react-query';

import Card from '@/components/Card';
import Category from '@/components/Category';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { categorySortBy } from '@/constant/categorySortBy';
import { useCustomQuery } from '@/hooks/useCustomQuery';
import { customAxios } from '@/libs/customAxios';
import { MobileCategoryPageStyled } from '@/styles/pageStyled/mobile/mobileCategoryPageStyled';
import { DetailCategory } from '@/types';
import { Categories, Product } from '@/types/categorymenu';

export default function MobileCategoriesPromote({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) {
  const {
    data: multiCategory,
    isFetching: isFetchingMultiCategory,
    error: errorCategory,
  } = useQuery({
    queryKey: [`/categories/${slug}`],
    queryFn: async () => {
      const { data } = await customAxios(PLATFORMLIST.MOBILE_WEB).get<DetailCategory>(
        `/categories/${slug}`,
      );
      return data;
    },
  });

  const {
    data: product,
    isPending,
    error: errorProduct,
  } = useCustomQuery<{
    items: Product[];
    multiLevelCategories: Categories[];
    totalCount: number;
  }>({
    queryKey: ['/products/search'],
    platform: PLATFORMLIST.PC,
    params: {
      categoryNos: slug,
      'order.by': categorySortBy[4].value,
      'order.direction': 'DESC',
      'filter.saleStatus': 'ONSALE',
      'filter.soldout': false,
      'filter.totalReviewCount': true,
      pageNumber: 1,
      pageSize: 100,
    },
  });

  if (isFetchingMultiCategory || isPending) {
    return <Loading.Mobile />;
  }

  return (
    <MobileCategoryPageStyled>
      <Header.Mobile title={multiCategory?.multiLevelCategories[0].label} hideBorderBottom={true} />
      <Category.Mobile error={errorCategory} data={multiCategory}></Category.Mobile>
      <Card.Mobile error={errorProduct} data={product}></Card.Mobile>
    </MobileCategoryPageStyled>
  );
}
