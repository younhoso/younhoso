import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { toast } from 'react-toastify';

import axios from 'axios';

import { StoreTypeCustom } from '@/types';

interface LikeProps {
  storeId: number;
}

export default function Like({ storeId }: LikeProps) {
  const { data: session } = useSession();

  const { data: store, refetch } = useQuery<StoreTypeCustom>({
    queryKey: [`like-store-${storeId}`],
    queryFn: async () => {
      const { data } = await axios.get(`/api/stores?id=${storeId}`);
      return data as StoreTypeCustom;
    },
    enabled: !!storeId,
  });

  const toggleLike = async () => {
    // 찜하기/찜취소 로직
    if (session?.user && store) {
      try {
        const like = await axios.post('/api/likes', {
          storeId: store.id,
        });

        if (like.status === 201) {
          toast.success('가게를 찜했습니다.');
        } else {
          toast.warn('찜을 취소했습니다.');
        }
        refetch();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <button type="button" onClick={toggleLike}>
      {/* 로그인된 사용자가 좋아요를 눌렀다면? */}
      {store?.likes?.length ? (
        <AiFillHeart className="hover:text-red-600 focus:text-red-600 text-red-500" />
      ) : (
        <AiOutlineHeart className="hover:text-red-600 focus:text-red-600" />
      )}
    </button>
  );
}
