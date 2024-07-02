import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlinePhone,
} from 'react-icons/ai';
import { HiOutlineMapPin } from 'react-icons/hi2';

import Image from 'next/image';

import { DataItem } from '@/types';

interface StoreBoxProps {
  store: DataItem | null;
  setStore: (v: null) => void;
}

export default function StoreBox({ store, setStore }: StoreBoxProps) {
  return (
    <div className="storeBox">
      {store && (
        <>
          <div className="store-wrap">
            <div className="store-inner">
              <div className="store-item">
                <Image
                  src={
                    store?.bizcnd_code_nm
                      ? `/images/markers/${store?.bizcnd_code_nm}.png`
                      : `/images/markers/default.png`
                  }
                  width={40}
                  height={40}
                  alt="아이콘 이미지"
                  priority={true}
                />
                <div>
                  <div className="font-semibold ">{store?.upso_nm}</div>
                  <div className="font-sm">{store?.cob_code_nm}</div>
                </div>
              </div>
              <button type="button" onClick={() => setStore(null)}>
                <AiOutlineClose />
              </button>
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <HiOutlineMapPin />
              {store?.rdn_code_nm || 'coming soon'}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlinePhone />
              {store?.tel_no || 'coming soon'}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineInfoCircle />
              {store?.crtfc_gbn_nm || 'coming soon'}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineCheck />
              {store?.bizcnd_code_nm || 'coming soon'}
            </div>
          </div>
          <button
            type="button"
            onClick={() => alert('상세보기 작업중')}
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg"
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
