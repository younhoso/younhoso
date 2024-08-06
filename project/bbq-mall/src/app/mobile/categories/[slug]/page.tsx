'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import DOMPurify from 'dompurify';

import Banner from '@/components/Banner';
import Card from '@/components/Card';
import Cardslide from '@/components/Cardslide';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import Nodata from '@/components/Nodata';
import PaginationTab from '@/components/PaginationTab';
import Select from '@/components/Select';
import Tab from '@/components/Tab';
import { PLATFORMLIST, VERSION2_0 } from '@/constant/axiosRelated';
import { categorySortBy } from '@/constant/categorySortBy';
import { useCustomQuery } from '@/hooks/useCustomQuery';
import { customAxios } from '@/libs/customAxios';
import { MobileCategoryPageStyled } from '@/styles/pageStyled/mobile/mobileCategoryPageStyled';
import { DetailCategory } from '@/types';
import { Event } from '@/types/Event';
import { Categories, Product } from '@/types/categorymenu';
import { getFlattenData } from '@/utils/dataCustom';

const cardSlideLimit = 10;
const productsLimit = 20;
const EVENT_CONTENT = 'Y';

const MobileCategory = ({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) => {
  const router = useRouter();
  const [orderBy, setOrderBy] = useState(categorySortBy[0]);
  const [page, setPage] = useState(1);
  const searchParam = useSearchParams();
  const isAllPage = searchParam.get('all') === 'true';

  const {
    data: event,
    isPending: isEventPending,
    error: errorEvent,
  } = useQuery({
    queryKey: ['/display/events'],
    queryFn: async ({ queryKey: [key] }) => {
      const { data } = await customAxios(PLATFORMLIST.MOBILE_WEB, VERSION2_0).get<{
        contents: Event[];
        totalCount: number;
        totalPage: number;
      }>(key, {
        params: {
          'page.number': 1,
          'page.size': 100,
          progressStatus: 'ING',
          eventYn: EVENT_CONTENT,
        },
      });

      const { contents } = data;

      return contents[Math.floor(Math.random() * contents.length)];
    },
  });

  const { data: detailCategory, isPending } = useQuery({
    queryKey: ['/categories'],
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.MOBILE_WEB).get<DetailCategory>(key),
  });

  const parentCategoryIncluded = getFlattenData(
    detailCategory?.data.multiLevelCategories,
    Number(slug),
    isAllPage,
  );

  const contentHtml = parentCategoryIncluded?.content;

  const categoryList = [
    { ...parentCategoryIncluded, label: '전체보기' },
    ...(parentCategoryIncluded?.children ?? []),
  ];

  const {
    data: productsPopular,
    isPending: isLoadingProductsPopular,
    error: errorProductsPopular,
    refetch: popularRefetch,
  } = useCustomQuery<{
    items: Product[];
    multiLevelCategories: Categories[];
  }>({
    queryKey: ['/products/search'],
    platform: PLATFORMLIST.MOBILE_WEB,
    params: {
      categoryNos: parentCategoryIncluded?.categoryNo,
      'order.by': orderBy.value,
      'filter.saleStatus': 'ONSALE',
      'filter.soldout': true,
      'filter.totalReviewCount': true,
      pageNumber: 1,
      pageSize: cardSlideLimit,
    },
  });

  useEffect(() => {
    if (parentCategoryIncluded?.categoryNo) popularRefetch();
  }, [parentCategoryIncluded?.categoryNo]);

  const {
    data: productsQuery,
    isFetching: isFetchingProductsQuery,
    isPending: aPending,
    error: errorProductsQuery,
    refetch,
  } = useCustomQuery<{
    items: Product[];
    multiLevelCategories: Categories[];
    totalCount: number;
  }>({
    queryKey: ['/products/search/filter'],
    platform: PLATFORMLIST.MOBILE_WEB,
    params: {
      categoryNos: Number(slug),
      'order.by': orderBy.value,
      'order.direction': orderBy.direction,
      'filter.saleStatus': 'ONSALE',
      'filter.soldout': false,
      'filter.totalReviewCount': true,
      pageNumber: page,
      pageSize: productsLimit,
    },
    customQuery: '/products/search',
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [orderBy, slug, page]);

  const TARGET = '631997';

  const redirectNeeded = slug === TARGET;

  useEffect(() => {
    if (redirectNeeded) {
      router.replace(`/mobile/categories/${TARGET}/promote`);
    }
  }, [redirectNeeded]);

  if (redirectNeeded) {
    return <Loading.Mobile />;
  }

  if (isEventPending || isLoadingProductsPopular || aPending || isPending) {
    return <Loading.Mobile />;
  }

  return (
    <MobileCategoryPageStyled>
      <Header.Mobile title={parentCategoryIncluded?.label} hideBorderBottom={true} />

      <Banner.Mobile error={errorEvent} data={event ? [event] : []}></Banner.Mobile>

      <Cardslide.Mobile
        className="categories-list"
        error={errorProductsPopular}
        data={productsPopular}
      >
        {contentHtml && (
          <div
            dangerouslySetInnerHTML={{ __html: contentHtml && DOMPurify.sanitize(contentHtml) }}
          />
        )}
      </Cardslide.Mobile>

      {categoryList && (
        <div className="category-button-inner">
          {categoryList.map(({ categoryNo, label }) => {
            return (
              <Tab
                className="mobile-tab"
                key={categoryNo}
                onClick={() => {
                  router.replace(`/categories/${categoryNo}${isAllPage ? '?all=true' : ''}`, {
                    scroll: false,
                  });
                }}
                active={Number(slug) === categoryNo}
              >
                <button>{label}</button>
              </Tab>
            );
          })}
        </div>
      )}

      <div className="count-sortby-inner">
        <p className="sortby-title"> 총 {productsQuery?.totalCount ?? 0} 개</p>
        <div className="sortby-inner">
          <Select.Mobile
            optionList={categorySortBy}
            defaultValue={orderBy.value}
            onChange={e => {
              const selectedOption = categorySortBy.find(option => option.value === e);
              selectedOption && setOrderBy(selectedOption);
            }}
          />
        </div>
      </div>
      {productsQuery?.totalCount === 0 ? (
        <Nodata.Mobile className="categories-nodata">등록된 상품이 없습니다.</Nodata.Mobile>
      ) : isFetchingProductsQuery ? (
        <Loading className="list-categories-loading" />
      ) : (
        <>
          <Card.Mobile error={errorProductsQuery} data={productsQuery}></Card.Mobile>
          <div className="pagination-inner">
            <PaginationTab
              total={productsQuery?.totalCount}
              limit={productsLimit}
              page={page}
              onChange={setPage}
            />
          </div>
        </>
      )}
    </MobileCategoryPageStyled>
  );
};

export default MobileCategory;
