import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useRef } from 'react';

import axios from 'axios';

import Loader from '@/components/Loader';
import Loading from '@/components/Loading';
import SearchFilter from '@/components/SearchFilter';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { StoreTypeCustom } from '@/types';

export default function StoreListPage() {
  const ref = useRef<HTMLDivElement | null>(null);

  const { isIntersecting, observe, unobserve } = useIntersectionObserver({
    threshold: 0.3,
  });

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(`/api/stores?page=${pageParam}`, {
      params: {
        limit: 10,
        page: pageParam,
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
    isPending,
  } = useInfiniteQuery({
    queryKey: ['infiniteStores'],
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
    if (isIntersecting && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }
    return () => clearTimeout(timerId);
  }, [fetchNext, isIntersecting, hasNextPage]);

  useEffect(() => {
    const currentElement = ref.current;
    if (currentElement) {
      observe(currentElement);
    }

    return () => {
      if (currentElement) {
        unobserve(currentElement);
      }
    };
  }, [observe, unobserve]);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  return (
    <div className="px-4 md:max-w-5xl mx-auto py-8">
      {/* search filter */}
      <SearchFilter />
      <ul role="list" className="divide-y divide-gray-100">
        {stores.pages?.map((page, index) => (
          <React.Fragment key={index}>
            {page.data.map((store: StoreTypeCustom, i: number) => {
              return (
                <li className="flex justify-between gap-x-6 py-5" key={i}>
                  <div className="flex gap-x-4">
                    <img
                      src={
                        store?.category
                          ? `/images/markers/${store?.category}.png`
                          : `/images/markers/default.png`
                      }
                      width={48}
                      height={48}
                      alt="아이콘 이미지"
                    />
                    <div>
                      <div className="text-sm font-semibold leading-9 text-gray-900">
                        {store?.name}
                      </div>
                      <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                        {store?.storeType}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <div className="text-sm font-semibold leading-6 text-gray-900">
                      {store?.address}
                    </div>
                    <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                      {store?.phone || '번호없음'} | {store?.foodCertifyName} | {''}
                      {store?.category}
                    </div>
                  </div>
                </li>
              );
            })}
          </React.Fragment>
        ))}
      </ul>

      {(isPending || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
}
