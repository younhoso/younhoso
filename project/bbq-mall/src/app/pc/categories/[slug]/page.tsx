'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import DOMPurify from 'dompurify';

import Banner from '@/components/Banner';
import Card from '@/components/Card';
import Cardslide from '@/components/Cardslide';
import Loading from '@/components/Loading';
import Nodata from '@/components/Nodata';
import PaginationTab from '@/components/PaginationTab';
import SortByButton from '@/components/SortByButton';
import Tab from '@/components/Tab';
import { PLATFORMLIST, VERSION2_0 } from '@/constant/axiosRelated';
import { categorySortBy } from '@/constant/categorySortBy';
import { useCustomQuery } from '@/hooks/useCustomQuery';
import { customAxios } from '@/libs/customAxios';
import { PcCategoryPageStyled } from '@/styles/pageStyled/pc/pcCategoryPageStyled';
import { DetailCategory } from '@/types';
import { Event } from '@/types/Event';
import { Categories, Product } from '@/types/categorymenu';
import { getFlattenData } from '@/utils/dataCustom';

const cardSlideLimit = 10;
const productsLimit = 20;
const EVENT_CONTENT = 'Y';

const PcCategory = ({
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
  const categoryTitleSrollRef = useRef<HTMLHeadingElement>(null);

  const {
    data: event,
    isPending: isEventPending,
    error: errorEvent,
  } = useQuery({
    queryKey: ['/display/events'],
    queryFn: async ({ queryKey: [key] }) => {
      const { data } = await customAxios(PLATFORMLIST.PC, VERSION2_0).get<{
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
    queryFn: ({ queryKey: [key] }) => customAxios(PLATFORMLIST.PC).get<DetailCategory>(key),
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
    platform: PLATFORMLIST.PC,
    params: {
      categoryNos: parentCategoryIncluded?.categoryNo,
      'order.by': categorySortBy[4].value,
      'filter.saleStatus': 'ONSALE',
      'filter.soldout': true,
      'filter.totalReviewCount': true,
      pageNumber: 1,
      pageSize: cardSlideLimit,
    },
    enabled: false,
  });

  useEffect(() => {
    if (parentCategoryIncluded?.categoryNo) popularRefetch();
  }, [parentCategoryIncluded?.categoryNo]);

  const {
    data: productList,
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
    platform: PLATFORMLIST.PC,
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

  const srollTopCategoryTitle = () => {
    if (categoryTitleSrollRef.current) {
      const rect = categoryTitleSrollRef.current.getBoundingClientRect();
      const scrollTop = document.documentElement.scrollTop;
      window.scrollTo({ top: rect.top + scrollTop - 200 });
    }
  };

  if (isEventPending || isLoadingProductsPopular || aPending || isPending) {
    return <Loading />;
  }

  return (
    <PcCategoryPageStyled>
      <Banner error={errorEvent} data={event ? [event] : []} />

      <Cardslide
        className="categories-list"
        error={errorProductsPopular}
        data={{ items: productsPopular?.items }}
      >
        {contentHtml && (
          <div
            dangerouslySetInnerHTML={{ __html: contentHtml && DOMPurify.sanitize(contentHtml) }}
          />
        )}
      </Cardslide>

      <h2 className="category-title" ref={categoryTitleSrollRef}>
        {parentCategoryIncluded?.label}
      </h2>

      {categoryList && (
        <div className="category-button-inner">
          {categoryList.map(({ categoryNo, label }) => {
            return (
              <Tab
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
        <p> 총 {productList?.totalCount ?? 0} 개의 상품이 있습니다.</p>
        <ul className="sortby-inner">
          {categorySortBy.map((item, index, arr) => (
            <SortByButton
              key={index}
              data={item}
              active={orderBy.label === item.label}
              onClick={() => setOrderBy(arr[index])}
            />
          ))}
        </ul>
      </div>
      {productList?.totalCount === 0 ? (
        <Nodata className="categories-nodata">등록된 상품이 없습니다.</Nodata>
      ) : isFetchingProductsQuery ? (
        <Loading height="200px" />
      ) : (
        <>
          <Card error={errorProductsQuery} data={productList} />
          <div className="pagination-inner">
            <PaginationTab
              total={productList?.totalCount}
              limit={productsLimit}
              page={page}
              onChange={setPage}
              srollTopRef={() => srollTopCategoryTitle()}
            />
          </div>
        </>
      )}
    </PcCategoryPageStyled>
  );
};

export default PcCategory;
