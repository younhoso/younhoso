'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import dayjs from 'dayjs';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import Button from '@/components/Button';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';
import { ProductInquiry } from '@/types';

import { ProductInquiryItemMobileStyled } from './styled';

export interface ProductInquiryItemMobileProps {
  className?: string;
  data: ProductInquiry;
  refetch: () => Promise<unknown>;
}

const ProductInquiryItemMobile = ({ className, data, refetch }: ProductInquiryItemMobileProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const setConfirmModalOpen = useSetRecoilState(confirmModalOpenStore);
  const resetConfirmModalOpen = useResetRecoilState(confirmModalOpenStore);

  const { mutateAsync } = useMutation({
    mutationFn: () =>
      customAxios(PLATFORMLIST.MOBILE_WEB).delete(`/products/inquiries/${data.inquiryNo}`),
  });

  return (
    <ProductInquiryItemMobileStyled className={clsx('ProductInquiryItemMobile', className)}>
      <div className="inquiry-item-info" onClick={() => setOpen(!open)}>
        <div>
          <p>{data.productName}</p>
          <p>{data.content}</p>
          <p className={clsx(data.replied && 'replied')}>
            <span>{data.replied ? '답변완료' : '답변대기'}</span> |{' '}
            {dayjs(new Date(data.registerYmdt)).format('YYYY.MM.DD')} 작성
          </p>
        </div>
        <Image src={'https:' + data.imageUrl} width={72} height={72} alt="image" />
      </div>
      <div className="inquiry-item-divider" />
      <div className={clsx('inquiry-item-content', open && 'open')}>
        <div>
          <div>Q</div>
          <div>{data.content}</div>
        </div>
        {data.answers?.map(v => (
          <div key={v.inquiryNo}>
            <div>A</div>
            <div>
              <p>{v.content}</p>
              <div>
                <div>{v.memberId ?? '비비큐 몰'}</div>
                <div>{dayjs(new Date(v.registerYmdt)).format('YYYY.MM.DD')}</div>
              </div>
            </div>
          </div>
        ))}
        <div className="inquiry-item-button-wrapper">
          <Button
            size="micro"
            disabled={!!data.answers?.length}
            onClick={() => router.push(`/my/inquiry/edit/${data.productNo}/${data.inquiryNo}`)}
          >
            수정
          </Button>
          <Button
            size="micro"
            disabled={!!data.answers?.length}
            onClick={async () => {
              setConfirmModalOpen({
                open: true,
                content: '정말 삭제하시겠습니까?',
                onOk: async () => {
                  try {
                    await mutateAsync();
                    await refetch();
                    resetConfirmModalOpen();
                  } catch (e: any) {
                    setConfirmModalOpen({
                      open: true,
                      content: e.response.data.message,
                      onOk: resetConfirmModalOpen,
                    });
                  }
                },
              });
            }}
          >
            삭제
          </Button>
        </div>
      </div>
    </ProductInquiryItemMobileStyled>
  );
};

export default ProductInquiryItemMobile;
