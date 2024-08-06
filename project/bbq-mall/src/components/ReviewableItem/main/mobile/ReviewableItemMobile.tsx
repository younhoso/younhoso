'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import dayjs from 'dayjs';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Button from '@/components/Button';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { Reviewable } from '@/types';

import { ReviewableItemMobileStyled } from './styled';

export interface ReviewableItemMobileProps {
  className?: string;
  data: Reviewable;
}

const ReviewableItemMobile = ({ className, data }: ReviewableItemMobileProps) => {
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const router = useRouter();
  const isBuyConfirmed = data.orderStatusType === 'BUY_CONFIRM';

  return (
    <>
      <ReviewableItemMobileStyled className={clsx('ReviewableItemMobile', className)}>
        <div className="reviewable-content">
          <div className="review-item-info">
            <p>{data.productName}</p>
            <p>
              {dayjs(new Date(data.orderStatusDate.registerYmdt)).format('YYYY.MM.DD')} 배송완료
            </p>
          </div>
          <Image src={'https:' + data.imageUrl} width={84} height={84} alt="image" />
        </div>

        <div className="reviewable-button-wrapper">
          <div className="reviewable-date">
            {data.orderStatusDate.reviewableYmdt &&
              `${dayjs(new Date(data.orderStatusDate.reviewableYmdt)).format(
                'MM.DD',
              )}까지 작성 가능`}
          </div>
          <Button
            onClick={() => {
              const goWrithReview = () =>
                router.push(
                  `/my/edit/review/${data.productNo}?option_no=${data.optionNo}&order_option_no=${data.orderOptionNo}`,
                );

              if (!isBuyConfirmed) {
                return setConfirmModalOpen({
                  content:
                    '구매확정되지 않은 주문입니다.\n 리뷰 작성시 자동으로 구매 확정 상태로 변경됩니다.\n 리뷰를 작성하시겠습니까?',
                  open: true,
                  onOk: () => {
                    goWrithReview();
                    resetOpenConfirm();
                  },
                  onCancel: resetOpenConfirm,
                });
              }

              goWrithReview();
            }}
            styleType="sub"
            size="micro"
          >
            리뷰 작성
          </Button>
        </div>
      </ReviewableItemMobileStyled>
    </>
  );
};

export default ReviewableItemMobile;
