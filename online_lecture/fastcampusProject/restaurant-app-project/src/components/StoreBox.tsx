import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlinePhone,
} from 'react-icons/ai';
import { HiOutlineMapPin } from 'react-icons/hi2';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import { currentStoreState } from '@/atom';

import Like from './Like';

export default function StoreBox() {
  const router = useRouter();
  const [store, setStore] = useRecoilState(currentStoreState);

  return (
    <div className="storeBox">
      {store && (
        <>
          <div className="store-wrap">
            <div className="store-inner">
              <div className="store-item">
                <Image
                  src={
                    store?.category
                      ? `/images/markers/${store?.category}.png`
                      : `/images/markers/default.png`
                  }
                  width={40}
                  height={40}
                  alt="아이콘 이미지"
                  fetchPriority="high"
                />
                <div>
                  <div className="font-semibold">{store?.name}</div>
                  <div className="font-sm">{store?.storeType}</div>
                </div>
              </div>
              <button type="button" onClick={() => setStore(null)}>
                <AiOutlineClose />
              </button>
            </div>
            <div className="flex justify-between gap-4">
              <div className="mt-2 flex gap-2 items-center col-span-3">
                <HiOutlineMapPin />
                {store?.address || 'coming soon'}
              </div>
              <Like storeId={store.id} />
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlinePhone />
              {store?.phone || 'coming soon'}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineInfoCircle />
              {store?.storeType || 'coming soon'}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineCheck />
              {store?.category || 'coming soon'}
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.push(`/stores/${store.id}`)}
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg"
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
