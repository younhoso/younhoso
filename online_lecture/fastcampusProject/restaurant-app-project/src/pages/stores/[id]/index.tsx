import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

import Link from 'next/link';
import { useRouter } from 'next/router';

import axios from 'axios';

import Like from '@/components/Like';
import Loader from '@/components/Loader';
import Map from '@/components/Map';
import Marker from '@/components/Marker';
import { StoreTypeCustom } from '@/types';

export default function StoreEditPage() {
  const router = useRouter();
  const { id } = router.query;
  const { status } = useSession();

  const {
    data: store,
    isPending,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: [`store-${id}`],
    queryFn: async () => {
      const { data } = await axios.get(`/api/stores?id=${id}`);
      return data as StoreTypeCustom;
    },
    enabled: !!id,
  });

  const handleDelete = async () => {
    const confirm = window.confirm('해당 가계를 삭제하시겠습니끼?');
    if (confirm && store) {
      try {
        const result = await axios.delete(`/api/stores?id=${store?.id}`);
        if (result.status === 200) {
          toast.success('가계를 삭제했습니다.');
          router.replace('/');
        } else {
          toast.error('다시 시도해주세요.');
        }
      } catch (e) {
        console.log(e);
        toast.error('다시 시도해주세요!');
      }
    }
  };

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

  console.log(store);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="md:flex justify-between items-center py-4 md:py-0">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">{store?.name}</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{store?.address}</p>
          </div>
          {status === 'authenticated' && store && (
            <div className="flex items-center gap-4 px-4 py-3">
              <Like storeId={store.id} />

              <Link
                className="underline hover:text-gray-400 text-sm"
                href={`/stores/${store?.id}/edit`}
              >
                수정
              </Link>
              <button
                type="button"
                className="underline hover:text-gray-400 text-sm"
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          )}
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
