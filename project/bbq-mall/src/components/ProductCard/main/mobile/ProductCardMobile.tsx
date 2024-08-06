'use client';

import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import chat from '@/assets/images/card/chat.svg';
import star from '@/assets/images/card/star.svg';
import Imagefill from '@/components/Imagefill';
import { Product } from '@/types/categorymenu';
import { comma } from '@/utils/regExp';

import { ProductCardMobileStyled } from './styled';

export interface ProductCardMobileProps {
  className?: string;
  item: Product;
  size?: string;
  showLike?: boolean;
}

const ProductCardMobile = ({
  className,
  item,
  size = '162px',
  showLike = true,
}: ProductCardMobileProps) => {
  return (
    <ProductCardMobileStyled className={clsx('ProductCardMobile', className)}>
      <Link href={'/categories/detail/' + item.productNo}>
        <Imagefill.Mobile height={size}>
          <Image
            src={'https:' + item.listImageUrls[0]}
            alt={item.productName}
            fill
            sizes="100vw"
            priority
          />
        </Imagefill.Mobile>
        <p className="title-product-name">{item.productName}</p>

        <div className="price">
          {!!item.immediateDiscountAmt && (
            <p>{Math.round((item.immediateDiscountAmt / item.salePrice) * 100)}%</p>
          )}

          <p>{comma(item.salePrice - item.immediateDiscountAmt)}원</p>
        </div>

        {showLike && (
          <div className="count-inner">
            <div>
              <Image src={star} alt="bbq-likeCount" className="logo" width={16} height={16} />
              <p>{String(item.reviewRating).padEnd(3, '.0')}</p>
            </div>
            <div>
              <Image
                src={chat}
                alt="bbq-totalReviewCount"
                className="logo"
                width={16}
                height={16}
              />
              <p>{item.totalReviewCount}</p>
            </div>
          </div>
        )}
      </Link>
    </ProductCardMobileStyled>
  );
};

export default ProductCardMobile;
