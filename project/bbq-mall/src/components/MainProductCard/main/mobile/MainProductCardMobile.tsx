'use client';

import Image from 'next/image';

import clsx from 'clsx';

import { Categories } from '@/types/categorymenu';
import { DisplaySection } from '@/types/mainProduct';
import { flattenData } from '@/utils/dataCustom';

import { MainProductCardMobileStyled, MaintProducatCardItemMobile } from './styled';

export interface MainProductCardMobileProps {
  className?: string;
  error: unknown;
  data: DisplaySection[] | undefined;
  categoryData?: Categories[];
}

const MainProductCardMobile = ({ className, data, categoryData }: MainProductCardMobileProps) => {
  return (
    <MainProductCardMobileStyled className={clsx('MainProductCardMobile', className)}>
      {data &&
        data.map(
          (
            { sectionNo, label, sectionExplain, imageUrl, leftSpaceColor, rightSpaceColor },
            index,
          ) => (
            <MaintProducatCardItemMobile
              key={sectionNo}
              $backgroundColor={leftSpaceColor ?? 'white'}
              $borderColor={rightSpaceColor ?? 'white'}
              href={`/categories/${flattenData(categoryData, 2)[index]?.categoryNo}`}
            >
              <p>{sectionExplain}</p>
              <div>{label}</div>
              <Image alt={label} src={'https:' + imageUrl} width={110} height={110} />
            </MaintProducatCardItemMobile>
          ),
        )}
    </MainProductCardMobileStyled>
  );
};

export default MainProductCardMobile;
