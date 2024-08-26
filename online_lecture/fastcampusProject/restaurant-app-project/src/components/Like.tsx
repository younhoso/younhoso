import { useQuery } from '@tanstack/react-query';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import axios from 'axios';

import { StoreTypeCustom } from '@/types';

interface LikeProps {
  storeId: number;
}

export default function Like({ storeId }: LikeProps) {
  const {
    data: store,
    isFetching,
    isSuccess,
    isError,
  } = useQuery<StoreTypeCustom>({
    queryKey: [`like-store-${storeId}`],
    queryFn: async () => {
      const { data } = await axios.get(`/api/stores?id=${storeId}`);
      return data as StoreTypeCustom;
    },
    enabled: !!storeId,
  });

  console.log(store);

  const toggleLike = () => {
    // 찜하기/찜취소 로직
  };

  return (
    <button type="button" className={'Like'} onClick={toggleLike}>
      {store?.likes?.length ? (
        <AiFillHeart className="horver:text-red-600 focus:text-red-600 text-red-500" />
      ) : (
        <AiOutlineHeart className="hover:text-red-600 focus:text-red-600" />
      )}
    </button>
  );
}
