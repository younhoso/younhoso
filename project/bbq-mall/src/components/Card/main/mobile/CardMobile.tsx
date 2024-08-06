'use client';

import clsx from 'clsx';

import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/categorymenu';

import { CardMobileStyled } from './styled';

export interface CardMobileProps {
  className?: string;
  error: unknown;
  data: { items: Product[] } | undefined;
}

const CardMobile = ({ className, error, data }: CardMobileProps) => {
  if (error) {
    return <div className="card-error">오류가 발생했습니다</div>;
  }

  return (
    <CardMobileStyled className={clsx('CardMobile', className)}>
      {data &&
        data.items.map(item => (
          <ProductCard.Mobile key={item.productNo} item={item} size={'auto'} />
        ))}
    </CardMobileStyled>
  );
};

export default CardMobile;
