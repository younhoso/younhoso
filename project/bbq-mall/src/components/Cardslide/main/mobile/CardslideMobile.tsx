'use client';

import { ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

import rightArrowAll from '@/assets/images/components/arrow-right-all.svg';
import ProductCard from '@/components/ProductCard';
import { Categories, Product } from '@/types/categorymenu';

import { CardslideMobileStyled } from './styled';

export interface CardslideMobileProps {
  className?: string;
  error: unknown;
  data: { label?: string; items: Product[] } | undefined;
  categoryData?: Categories[];
  children: ReactNode;
}

const MAINPAGE = '/mobile';

const CardslideMobile = ({
  className,
  error,
  data,
  categoryData,
  children,
}: CardslideMobileProps) => {
  const pathname = usePathname();
  const categoryNo = categoryData?.find(v => v.label === data?.label)?.categoryNo;

  if (!data?.items || !data.items.length) {
    return null;
  }
  const dataItems = data.items.slice(0, 6);

  if (error) {
    return <div className="cardslide-error">오류가 발생했습니다</div>;
  }

  return (
    <CardslideMobileStyled className={clsx('CardslideMobile', className)}>
      {children}
      <div className="mobile-cart-products">
        {dataItems.map(item => (
          <ProductCard.Mobile key={item.productNo} size="156px" item={item} />
        ))}

        {pathname === MAINPAGE && (
          <div className="all-view-inner">
            <Link href={`/categories/${categoryNo}/promote`}>
              <Image src={rightArrowAll} alt="Next 버튼" width={45} height={45} />
              <p>전체보기</p>
            </Link>
          </div>
        )}
      </div>
    </CardslideMobileStyled>
  );
};

export default CardslideMobile;
