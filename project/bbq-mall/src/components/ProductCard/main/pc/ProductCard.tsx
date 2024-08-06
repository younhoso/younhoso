'use client';

import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import chat from '@/assets/images/card/chat.svg';
import star from '@/assets/images/card/star.svg';
import vector from '@/assets/images/card/vector.svg';
import Imagefill from '@/components/Imagefill';
import { Product } from '@/types/categorymenu';
import { comma } from '@/utils/regExp';

import { ProductCardStyled } from './styled';

export interface ProductCardProps {
  className?: string;
  item: Product;
  size?: string;
  showLike?: boolean;
}

const ProductCard = ({ className, item, size = '243px', showLike = true }: ProductCardProps) => {
  return (
    <ProductCardStyled className={clsx('ProductCard', className)}>
      <Link href={'/categories/detail/' + item.productNo}>
        <Imagefill height={size}>
          <Image
            src={'https:' + item.listImageUrls[0]}
            alt={item.productName}
            fill
            sizes="100vw"
            priority
          />
        </Imagefill>
        <p className="title-product-name">{item.productName}</p>

        <div className="price">
          <div className="default-price-inner">
            <Image src={vector} alt="bbq-logo" className="logo" width={20} height={20} />
            <p className="title-sale-price">
              {comma(item.salePrice - item.immediateDiscountAmt)}원
            </p>
          </div>

          {!!item.immediateDiscountAmt && (
            <div className="sale-price-inner">
              <p>{Math.round((item.immediateDiscountAmt / item.salePrice) * 100)}%</p>
              <p>{comma(item.salePrice)}원</p>
            </div>
          )}
        </div>

        {showLike && (
          <div className="count-inner">
            <div>
              <Image src={star} alt="bbq-logo" className="logo" width={24} height={24} />
              <p>{String(item.reviewRating).padEnd(3, '.0')}</p>
            </div>
            <div>
              <Image src={chat} alt="bbq-logo" className="logo" width={24} height={24} />
              <p>{item.totalReviewCount}</p>
            </div>
          </div>
        )}
      </Link>
    </ProductCardStyled>
  );
};

export default ProductCard;
