'use client';

import { ReactNode } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import redCheck from '@/assets/images/components/red-check.svg';
import Button from '@/components/Button';
import { ModalProps } from '@/components/Modal/main/pc/Modal';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { useAddCart } from '@/hooks/useAddCart';
import { OrderHistoryDetail } from '@/types/orderHistoryRelated';

import { ClaimModalStyled } from './styled';

export interface ClaimModalProps extends Pick<ModalProps, 'onClose' | 'title' | 'open'> {
  className?: string;
  data: OrderHistoryDetail;
  description: ReactNode;
  hideCart?: boolean;
}

const ClaimModal = ({
  className,
  onClose,
  title,
  open,
  data,
  description,
  hideCart,
}: ClaimModalProps) => {
  const router = useRouter();
  const { addCart, isLoading } = useAddCart(PLATFORMLIST.PC);

  const productList = data?.orderOptionsGroupByPartner
    .flatMap(v => v.orderOptionsGroupByDelivery.flatMap(k => k.orderOptions))
    .map(v => ({
      productNo: v.productNo,
      optionNo: v.optionNo,
      orderCnt: v.orderCnt,
      optionInputs: v.inputs,
    }));

  return (
    <ClaimModalStyled
      footer={null}
      title={title + '신청 완료'}
      open={open}
      onClose={onClose}
      className={clsx('ClaimModal', className)}
      width="480px"
      closeOnClickOutside={false}
    >
      <div className="red-check">
        <Image src={redCheck} width={48} height={48} alt="red-check" />
        <h3>{title}신청이 완료되었습니다.</h3>
      </div>

      <div className="info-wrapper">
        <h6>
          주문번호 <span>{data.orderNo}</span>
        </h6>
        <p>{description}</p>
      </div>
      <Button
        styleType="main"
        fullWidth
        onClick={() => {
          router.push('/');
          onClose();
        }}
      >
        홈으로 이동
      </Button>
      {!hideCart && (
        <Button
          fullWidth
          className="add-cart"
          isLoading={isLoading}
          disabled={isLoading}
          onClick={async () => {
            await addCart(productList);
            onClose();
          }}
        >
          {title} 상품 다시 담기
        </Button>
      )}
    </ClaimModalStyled>
  );
};

export default ClaimModal;
