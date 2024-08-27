import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useRef } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import axios from 'axios';
import { useRecoilValue } from 'recoil';

import { searchState } from '@/atom';
import Loader from '@/components/Loader';
import Loading from '@/components/Loading';
import SearchFilter from '@/components/SearchFilter';
import StoreList from '@/components/StoreList';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { StoreTypeCustom } from '@/types';

export default function StoreListPage() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const searchValue = useRecoilValue(searchState);
  const isPageEnd = !!pageRef?.isIntersecting;

  const searchParams = {
    q: searchValue?.q,
    district: searchValue?.district,
  };

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios.get('/api/stores?page=' + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
        ...searchParams,
      },
    });

    return data;
  };

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['infiniteStores', searchParams],
    queryFn: fetchStores,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data?.length > 0 ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, isPageEnd, hasNextPage]);

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <SearchFilter />
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((store: StoreTypeCustom, i: number) => (
                <StoreList store={store} i={i} key={i} />
              ))}
            </React.Fragment>
          ))
        )}
      </ul>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
}
