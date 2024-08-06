'use client';

import clsx from 'clsx';

import { CombinedProduct } from '@/types/productDetail';
import { comma } from '@/utils/regExp';

import { ProductDeliveryInfoStyled } from './styled';

export interface ProductDeliveryInfoProps {
  className?: string;
  data: CombinedProduct;
}

const ProductDeliveryInfo = ({ className, data }: ProductDeliveryInfoProps) => {
  const { partner, price, deliveryFee } = data;
  const info = [
    { label: '브랜드', value: partner && partner.partnerName },
    { label: '회원 혜택', value: price.accumulationRate + '% 포인트 적립' },
    { label: '배송비', value: comma(deliveryFee.deliveryAmt) + '원' },
    { label: '배송 안내', value: deliveryFee.deliveryCustomerInfo },
  ];

  return (
    <ProductDeliveryInfoStyled className={clsx('ProductDeliveryInfo', className)}>
      {info.map(v => (
        <div key={v.label} className="delivery-info">
          <p>{v.label}</p>
          <p>{v.value}</p>
        </div>
      ))}
    </ProductDeliveryInfoStyled>
  );
};

export default ProductDeliveryInfo;
