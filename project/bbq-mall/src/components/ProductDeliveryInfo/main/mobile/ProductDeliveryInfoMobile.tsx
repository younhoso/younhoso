'use client';

import clsx from 'clsx';

import { CombinedProduct } from '@/types/productDetail';
import { comma } from '@/utils/regExp';

import { ProductDeliveryInfoMobileStyled } from './styled';

export interface ProductDeliveryInfoMobileProps {
  className?: string;
  data: CombinedProduct;
}

const ProductDeliveryInfoMobile = ({ className, data }: ProductDeliveryInfoMobileProps) => {
  const { partner, price, deliveryFee } = data;
  const info = [
    { label: '브랜드', value: partner && partner.partnerName },
    { label: '회원 혜택', value: price.accumulationRate + '% 포인트 적립' },
    { label: '배송비', value: comma(deliveryFee.deliveryAmt) + '원' },
    { label: '배송 안내', value: deliveryFee.deliveryCustomerInfo },
  ];

  return (
    <ProductDeliveryInfoMobileStyled className={clsx('ProductDeliveryInfoMobile', className)}>
      {info.map(v => (
        <div key={v.label} className="delivery-info">
          <p>{v.label}</p>
          <p>{v.value}</p>
        </div>
      ))}
    </ProductDeliveryInfoMobileStyled>
  );
};

export default ProductDeliveryInfoMobile;
