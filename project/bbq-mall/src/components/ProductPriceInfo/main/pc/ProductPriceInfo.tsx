'use client';

import Image from 'next/image';

import clsx from 'clsx';

import chat from '@/assets/images/card/chat.svg';
import vector from '@/assets/images/card/vector.svg';
import StarRating from '@/components/StarRating';
import { CombinedProduct } from '@/types/productDetail';
import { comma } from '@/utils/regExp';

import { ProductPriceInfoStyled } from './styled';

export interface ProductPriceInfoProps {
  className?: string;
  data: CombinedProduct;
}

const ProductPriceInfo = ({ className, data }: ProductPriceInfoProps) => {
  const { baseInfo, reviewRate, counter, price } = data;

  return (
    <ProductPriceInfoStyled className={clsx('ProductPriceInfo', className)}>
      <h2>{baseInfo.productName}</h2>
      <div className="reviewReview-inner">
        <div className="reviewRate-inner">
          <StarRating count={5} size={24} value={reviewRate} />
          <p>{String(reviewRate).padEnd(3, '.0')}</p>
        </div>

        <div className="review-inner">
          <Image src={chat} alt="bbq-logo" className="logo" width={24} height={24} />
          <p>{counter.reviewCnt}</p>
        </div>
      </div>

      <div className="price">
        <div className="default-price-inner">
          <Image src={vector} alt="bbq-logo" className="logo" width={20} height={20} />
          <p className="title-sale-price">
            {comma(price.salePrice - price.immediateDiscountAmt)}원
          </p>
        </div>

        {!!price.immediateDiscountAmt && (
          <div className="sale-price-inner">
            <p>{Math.round((price.immediateDiscountAmt / price.salePrice) * 100)}%</p>
            <p>{comma(price.salePrice)}원</p>
          </div>
        )}
      </div>
    </ProductPriceInfoStyled>
  );
};

export default ProductPriceInfo;
