'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import redCheck from '@/assets/images/components/red-check.svg';
import Button from '@/components/Button';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { useAddCart } from '@/hooks/useAddCart';

import { ClaimModalProps } from '../pc/ClaimModal';
import { ClaimModalMobileStyled } from './styled';

const ClaimModalMobile = ({
  className,
  onClose,
  title,
  open,
  data,
  description,
  hideCart,
}: ClaimModalProps) => {
  const router = useRouter();
  const { addCart, isLoading } = useAddCart(PLATFORMLIST.MOBILE_WEB);

  const productList = data?.orderOptionsGroupByPartner
    .flatMap(v => v.orderOptionsGroupByDelivery.flatMap(k => k.orderOptions))
    .map(v => ({
      productNo: v.productNo,
      optionNo: v.optionNo,
      orderCnt: v.orderCnt,
      optionInputs: v.inputs,
    }));
  return (
    <ClaimModalMobileStyled
      footer={null}
      open={open}
      onClose={onClose}
      hideTitle
      closeOnClickOutside={false}
      className={clsx('ClaimModalMobile', className)}
    >
      <div className="red-check">
        <Image src={redCheck} width={36} height={36} alt="red-check" />
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
        size="micro"
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
          size="micro"
        >
          {title} 상품 다시 담기
        </Button>
      )}
    </ClaimModalMobileStyled>
  );
};

export default ClaimModalMobile;
