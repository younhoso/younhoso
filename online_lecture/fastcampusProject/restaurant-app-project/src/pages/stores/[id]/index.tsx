import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { useRouter } from 'next/router';

import axios from 'axios';

import Loader from '@/components/Loader';
import Map from '@/components/Map';
import Marker from '@/components/Marker';
import { StoreTypeCustom } from '@/types';

export default function StoreEditPage() {
  const router = useRouter();
  const { id } = router.query;

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${id}`);
    return data as StoreTypeCustom;
  };

  const {
    data: store,
    isPending,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: [`store-${id}`],
    queryFn: fetchStore,
    enabled: !!id,
  });

  if (isPending) {
    return <Loader className="mt-[20%]" />;
  }

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">{store?.name}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{store?.address}</p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">카테고리</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.category}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">주소</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.address}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">위도</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.lat}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">경도</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.lng}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">연락처</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.phone || 'coming soon'}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">식품인증구분</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.foodCertifyName || 'coming soon'}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">업종명</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.storeType || 'coming soon'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {isSuccess && (
        <div className="w-full mb-20 max-w-5xl mx-auto h-[60vh]">
          <Map lat={store?.lat} lng={store?.lng} zoom={1} />
          <Marker store={store} />
        </div>
      )}
    </>
  );
}
