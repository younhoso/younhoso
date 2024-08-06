'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import cryingChicken from '@/assets/images/my/crying-chicken.png';
import { NO, YES } from '@/components/AddressAddModal/main/pc/AddressAddModal';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { PLATFORMLIST, VERSION1_1 } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { MobileMyLikePageStyled } from '@/styles/pageStyled/mobile/mobileMyLikePageStyled';
import { LikeItem, TotalCountWithItems } from '@/types';

const MobileMyLike = () => {
  const router = useRouter();
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const { data, isPending, refetch } = useQuery({
    queryKey: ['/profile/like-products'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.MOBILE_WEB).get<TotalCountWithItems<LikeItem>>(key, {
        params: {
          hasTotalCount: true,
        },
      }),
  });
  const { mutateAsync: modify } = useMutation({
    mutationFn: (body: { items: { productNo: number; like: typeof YES | typeof NO }[] }) =>
      customAxios(PLATFORMLIST.PC, VERSION1_1).post('/profile/like-products/', body),
  });

  return (
    <MobileMyLikePageStyled
      className={clsx((isPending || !data?.data.totalCount) && 'align-center')}
    >
      {isPending ? (
        <Loading.Mobile />
      ) : data?.data.totalCount ? (
        data?.data.items.map(v => (
          <div key={v.productNo} className="mobile-like-item">
            <div className="like-item-info">
              <Image src={'https:' + v.imageUrls[0]} alt="image" width={72} height={72} />
              <div>
                <p onClick={() => router.push(`/categories/detail/${v.productNo}`)}>
                  {v.productName}
                </p>
                <div>
                  <p>{(v.salePrice - v.immediateDiscountAmt).toLocaleString()}원</p>
                  {!!v.immediateDiscountAmt && <p>{v.salePrice.toLocaleString()}원</p>}
                </div>
              </div>
            </div>
            <div className="like-item-button-wrapper">
              <Button
                size="micro"
                styleType="sub"
                onClick={() => router.push(`/categories/detail/${v.productNo}`)}
              >
                상세페이지
              </Button>
              <Button
                size="micro"
                onClick={() => {
                  setConfirmModalOpen({
                    open: true,
                    content: '정말 삭제하시겠습니까?',
                    onOk: async () => {
                      await modify({
                        items: [
                          {
                            productNo: v.productNo,
                            like: NO,
                          },
                        ],
                      });
                      resetOpenConfirm();
                      refetch();
                    },
                    onCancel: resetOpenConfirm,
                  });
                }}
              >
                삭제
              </Button>
            </div>
          </div>
        ))
      ) : (
        <>
          <p>관심상품이 없습니다.</p>
          <Image src={cryingChicken} width={221} height={132} alt="crying-chicken" unoptimized />
        </>
      )}
    </MobileMyLikePageStyled>
  );
};

export default MobileMyLike;
