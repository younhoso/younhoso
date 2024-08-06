'use client';

import { useQuery } from '@tanstack/react-query';

import Card from '@/components/Card';
import Category from '@/components/Category';
import Loading from '@/components/Loading';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { categorySortBy } from '@/constant/categorySortBy';
import { useCustomQuery } from '@/hooks/useCustomQuery';
import { customAxios } from '@/libs/customAxios';
import { PcCategoryPageStyled } from '@/styles/pageStyled/pc/pcCategoryPageStyled';
import { DetailCategory } from '@/types';
import { Categories, Product } from '@/types/categorymenu';

export default function PcCategoriesPromote({
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
      const { data } = await customAxios(PLATFORMLIST.PC).get<DetailCategory>(
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
    return <Loading />;
  }

  return (
    <PcCategoryPageStyled>
      <Category error={errorCategory} data={multiCategory}></Category>

      <Card error={errorProduct} data={product} />
    </PcCategoryPageStyled>
  );
}
