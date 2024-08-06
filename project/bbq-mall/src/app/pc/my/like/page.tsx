'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { NO, YES } from '@/components/AddressAddModal/main/pc/AddressAddModal';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination';
import { PLATFORMLIST, VERSION1_1 } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { PcMyLikePageStyled } from '@/styles/pageStyled/pc/pcMyLikePageStyled';
import { LikeItem, TotalCountWithItems } from '@/types';

const limit = 10;

const PcMyLike = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);

  const { mutateAsync: modify } = useMutation({
    mutationFn: (body: { items: { productNo: number; like: typeof YES | typeof NO }[] }) =>
      customAxios(PLATFORMLIST.PC, VERSION1_1).post('/profile/like-products/', body),
  });

  const { data, isPending, refetch } = useQuery({
    queryKey: ['/profile/like-products'],
    queryFn: ({ queryKey: [key] }) =>
      customAxios(PLATFORMLIST.PC).get<TotalCountWithItems<LikeItem>>(key, {
        params: {
          hasTotalCount: true,
          pageSize: limit,
          pageNumber: page,
        },
      }),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <PcMyLikePageStyled>
      <PageTitle title="관심상품" description="관심상품은 최대 100개까지 저장됩니다." />

      <div
        className={clsx(
          'my-like-content',
          (isPending || !data?.data.totalCount) && 'min-height-set',
        )}
      >
        {isPending ? (
          <Loading height="143px" />
        ) : data?.data.totalCount ? (
          <>
            {data?.data.items.map(v => (
              <div key={v.productNo} className="my-like-item">
                <Image src={'https:' + v.imageUrls[0]} width={84} height={84} alt="product" />
                <div className="my-like-item-info">
                  <p onClick={() => router.push(`/categories/detail/${v.productNo}`)}>
                    {v.productName}
                  </p>
                  <div>
                    <p>{(v.salePrice - v.immediateDiscountAmt).toLocaleString()}원</p>
                    {!!v.immediateDiscountAmt && <p>{v.salePrice.toLocaleString()}원</p>}
                  </div>
                </div>
                <div className="my-like-button-wrapper">
                  <Button
                    size="small"
                    styleType="sub"
                    onClick={() => router.push(`/categories/detail/${v.productNo}`)}
                  >
                    상세페이지
                  </Button>
                  <Button
                    size="small"
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
            ))}
          </>
        ) : (
          '관심상품이 없습니다.'
        )}
      </div>
      {!!data?.data.totalCount && (
        <Pagination limit={limit} total={data?.data.totalCount} onChange={setPage} />
      )}
    </PcMyLikePageStyled>
  );
};

export default PcMyLike;
