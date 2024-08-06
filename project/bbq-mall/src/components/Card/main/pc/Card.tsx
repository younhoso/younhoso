'use client';

import Loading from '@/components/Loading';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/categorymenu';

import { CardStyled } from './styled';

export interface CardProps {
  className?: string;
  error?: unknown;
  data: { items: Product[] } | undefined;
}

const Card = ({ error, data }: CardProps) => {
  if (error) {
    return <div className="card-error">오류가 발생했습니다</div>;
  }

  return (
    <CardStyled>
      {data && data.items.map(item => <ProductCard item={item} key={item.productNo} />)}
    </CardStyled>
  );
};

export default Card;
