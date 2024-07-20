import Image from 'next/image';

import { StoreTypeCustom } from '@/types';

export default function StoreListPage({ stores }: { stores: StoreTypeCustom[] }) {
  return (
    <div className="px-4 md:max-w-5xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
        {stores?.map((store, index) => (
          <li className="flex justify-between gap-x-6 py-5" key={index}>
            <div className="flex gap-x-4">
              <Image
                src={
                  store?.category
                    ? `/images/markers/${store?.category}.png`
                    : `/images/markers/default.png`
                }
                width={48}
                height={48}
                alt="아이콘 이미지"
                priority={true}
              />
              <div>
                <div className="text-sm font-semibold leading-9 text-gray-900">{store?.name}</div>
                <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                  {store?.storeType}
                </div>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <div className="text-sm font-semibold leading-6 text-gray-900">{store?.address}</div>
              <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                {store?.phone || '번호없음'} | {store?.foodCertifyName} | {''}
                {store?.category}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);

  if (!res.ok) {
    console.error(`Failed to fetch stores: ${res.status} ${res.statusText}`);
    return {
      props: { stores: [] },
    };
  }

  try {
    const stores = await res.json();
    return {
      props: { stores },
    };
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return {
      props: { stores: [] },
    };
  }
}
