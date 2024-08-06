'use client';

import Image from 'next/image';

import clsx from 'clsx';

import { Categories } from '@/types/categorymenu';
import { DisplaySection } from '@/types/mainProduct';
import { flattenData } from '@/utils/dataCustom';

import { MainProductCardItemStyled, MainProductCardStyled } from './styled';

export interface MainProductCardProps {
  className?: string;
  error: unknown;
  data?: DisplaySection[];
  categoryData?: Categories[];
}

const MainProductCard = ({ className, data, categoryData }: MainProductCardProps) => {
  return (
    <MainProductCardStyled className={clsx('MainProductCard', className)}>
      {data &&
        data.map(
          (
            { sectionNo, label, sectionExplain, imageUrl, leftSpaceColor, rightSpaceColor },
            index,
          ) => (
            <MainProductCardItemStyled
              key={sectionNo}
              $backgroundColor={leftSpaceColor ?? 'white'}
              $borderColor={rightSpaceColor ?? 'white'}
              href={`/categories/${flattenData(categoryData, 2)[index]?.categoryNo}`}
            >
              <p>{sectionExplain}</p>
              <div>{label}</div>
              <Image alt={label} src={'https:' + imageUrl} width={196} height={196} />
            </MainProductCardItemStyled>
          ),
        )}
    </MainProductCardStyled>
  );
};

export default MainProductCard;
