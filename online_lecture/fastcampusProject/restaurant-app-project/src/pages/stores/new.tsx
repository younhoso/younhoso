import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import axios from 'axios';

import AddressSearch from '@/components/AddressSearch';
import { CATEGORY_ARR, FOOD_CERTIFY_ARR, STORE_TYPE_ARR } from '@/data/store';
import { StoreTypeCustom } from '@/types';

export default function StoresNewPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StoreTypeCustom>();
  return (
    <form
      className="px-4 md:max-w-4xl mx-auto py-8"
      onSubmit={handleSubmit(async data => {
        try {
          const result = await axios.post('/api/stores', data);
          console.log(result);

          if (result.status === 200) {
            // 성공 케이스
            toast.success('맛집을 등록했습니다.');
            router.replace(`/stores/${result?.data?.id}`);
          } else {
            // 실패 케이스
            toast.error('다시 시도해주세요!');
          }
        } catch (e) {
          toast.error('데이터 생성중 문제가 생겼습니다. 다시 시도해주세요.');
        }
      })}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">맛집 등록</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            아래 내용을 입력해서 맛집을 등록해주세요
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                가계명
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                />
                {errors.name?.type === 'required' && (
                  <div className="pt-2 text-xs text-red-600">필수 입력사항입니다.</div>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                카테고리
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  {...register('category', { required: true })}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                >
                  <option value="">카테고리 선택</option>
                  {CATEGORY_ARR?.map(category => {
                    return (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
                {errors.category?.type === 'required' && (
                  <div className="pt-2 text-xs text-red-600">필수 입력사항입니다.</div>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                연락처
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  {...register('phone', { required: true })}
                />
                {errors.phone?.type === 'required' && (
                  <div className="pt-2 text-xs text-red-600">필수 입력사항입니다.</div>
                )}
              </div>
            </div>

            <AddressSearch setValue={setValue} register={register} errors={errors} watch={watch} />
            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                식품인증구분
              </label>
              <div className="mt-2">
                <select
                  id="city"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  {...register('foodCertifyName', { required: true })}
                >
                  <option value="">식품인증구분 선택</option>
                  {FOOD_CERTIFY_ARR?.map(data => {
                    return (
                      <option key={data} value={data}>
                        {data}
                      </option>
                    );
                  })}
                </select>
                {errors.foodCertifyName?.type === 'required' && (
                  <div className="pt-2 text-xs text-red-600">필수 입력사항입니다.</div>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="storeType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                업종구분
              </label>
              <div className="mt-2">
                <select
                  id="storeType"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"
                  {...register('storeType', { required: true })}
                >
                  <option value="">업종구분 선택</option>
                  {STORE_TYPE_ARR?.map(data => {
                    return (
                      <option key={data} value={data}>
                        {data}
                      </option>
                    );
                  })}
                </select>
                {errors.storeType?.type === 'required' && (
                  <div className="pt-2 text-xs text-red-600">필수 입력사항입니다.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          뒤로가기
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          제출하기
        </button>
      </div>
    </form>
  );
}
