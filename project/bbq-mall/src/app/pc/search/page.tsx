'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import clsx from 'clsx';

import searchIcon from '@/assets/images/search/search-gray.svg';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import ProductCard from '@/components/ProductCard';
import { SortByKeyList, sortBy } from '@/components/Search/main/pc/Search';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { PcSearchPageStyled } from '@/styles/pageStyled/pc/pcSearchPageStyled';
import { TotalCountWithItems } from '@/types';
import { Product } from '@/types/categorymenu';

const limit = 20;
const PcSearch = () => {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const sortByKeyList = Object.keys(sortBy) as SortByKeyList[];
  const [orderByKey, setOrderByKey] = useState(sortByKeyList[0]);
  const keyword = searchParams.get('keyword');
  const router = useRouter();

  const { data, isPending } = useQuery({
    queryKey: ['/products/search' + keyword + page + orderByKey],
    queryFn: () =>
      customAxios(PLATFORMLIST.PC).get<TotalCountWithItems<Product>>('/products/search', {
        params: {
          'filter.keywords': keyword,
          pageNumber: page,
          pageSize: limit,
          hasTotalCount: true,
          excludeCategoryNos: '668857,676631',
          ...sortBy[orderByKey],
        },
      }),
  });

  if (!keyword || keyword.length < 2) {
    router.replace('/');
  }

  return (
    <PcSearchPageStyled>
      <h2>
        &lsquo;<span>{keyword}</span>&rsquo; 에 대한 검색 결과
      </h2>
      {isPending ? (
        <div className="no-item">
          <Loading />
        </div>
      ) : data?.data.totalCount ? (
        <div className="search-result-wrapper">
          <div className="search-info">
            <div>총 {data.data.totalCount} 개의 상품이 있습니다.</div>
            <div>
              {sortByKeyList.map(v => (
                <div
                  className={clsx(v === orderByKey && 'active')}
                  key={v}
                  onClick={() => setOrderByKey(v)}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>
          <div className="search-item-list-wrapper">
            {data?.data.items.map(v => <ProductCard item={v} key={v.productNo} />)}
          </div>
          <Pagination onChange={setPage} limit={limit} total={data.data.totalCount} />
        </div>
      ) : (
        <div className="no-item">
          <Image src={searchIcon} width={48} height={48} alt="search-icon" />
          <p>검색된 상품이 없습니다.</p>
          <p>다른 검색어를 입력해주세요.</p>
        </div>
      )}
    </PcSearchPageStyled>
  );
};

export default PcSearch;
