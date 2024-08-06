'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';
import dayjs from 'dayjs';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Button from '@/components/Button';
import ReviewWriteModal from '@/components/ReviewWriteModal';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { CreateReview, ModifyReview, Reviewable } from '@/types';

import { ReviewableItemStyled } from './styled';

export interface ReviewableItemProps {
  className?: string;
  refetch?: () => Promise<unknown>;
  data: Reviewable;
}

const ReviewableItem = ({ className, data, refetch }: ReviewableItemProps) => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: (body: CreateReview | ModifyReview) =>
      customAxios(PLATFORMLIST.PC).post(`/products/${data.productNo}/product-reviews`, body),
  });

  const isBuyConfirmed = data.orderStatusType === 'BUY_CONFIRM';

  return (
    <>
      <ReviewableItemStyled className={clsx('ReviewableItem', className)}>
        <Image src={'https:' + data.imageUrl} width={84} height={84} alt="image" />
        <div className="review-item-info">
          <p>{data.productName}</p>
          <p>{dayjs(new Date(data.orderStatusDate.registerYmdt)).format('YYYY.MM.DD')} 배송완료</p>
        </div>
        <div className="reviewable-date">
          {data.orderStatusDate.reviewableYmdt &&
            `${dayjs(new Date(data.orderStatusDate.reviewableYmdt)).format('MM.DD')}까지 작성 가능`}
        </div>
        <Button
          onClick={() => {
            if (!isBuyConfirmed) {
              return setConfirmModalOpen({
                content:
                  '구매확정되지 않은 주문입니다.\n 리뷰 작성시 자동으로 구매 확정 상태로 변경됩니다.\n 리뷰를 작성하시겠습니까?',
                open: true,
                onOk: () => {
                  setOpen(true);
                  resetOpenConfirm();
                },
                onCancel: resetOpenConfirm,
              });
            }

            setOpen(true);
          }}
          styleType="sub"
          size="small"
        >
          리뷰 작성
        </Button>
      </ReviewableItemStyled>
      {open && (
        <ReviewWriteModal
          productData={data}
          open={open}
          onClose={() => setOpen(false)}
          mutate={mutateAsync}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default ReviewableItem;
